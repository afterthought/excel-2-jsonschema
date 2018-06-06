'use strict';

/* eslint-disable no-use-before-define, no-param-reassign */

var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var jsonfile = require('jsonfile');
var XLSX = require('xlsx');
var assert = require('assert');

var primitiveTypes = ['boolean', 'integer', 'number', 'string', 'any'];
jsonfile.spaces = 4;
// TODO: add validations
module.exports = function (inputExcelFile, sheetName, outputDir) {
  assert(inputExcelFile, 'Please provide Input Excel Sheet location');
  assert(sheetName, 'Please provide Sheet Name');
  assert(outputDir, 'Please provide Output dir location');

  console.log('Generating json schema from ' + inputExcelFile + ' to ' + outputDir);
  var workbook = XLSX.readFile(inputExcelFile);
  var modelInfo = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Group by Model Names
  var modelList = _.chain(modelInfo).reject(function (value) {
    return value.Ignore;
  }).groupBy(function (value) {
    return value.Name;
  }).value();

  // Generate JSON Examples
  var output = _.mapValues(modelList, function (v, k) {
    return generateJSON(k, v, modelList);
  });

  // write to files
  fs.emptyDirSync(outputDir);
  _.forEach(output, function (value, key) {
    jsonfile.writeFileSync(path.join(outputDir, _.kebabCase(key) + '.json'), value);
  });
};

function generateJSON(modelName, model, modelList) {
  return _.reduce(model, function (result, value) {
    var jsonValue = void 0;
    if (_.includes(primitiveTypes, _.lowerCase(value.Type))) {
      if (value.Example) {
        jsonValue = value.Example;
      } else {
        switch (value.Type) {
          case 'any':
            jsonValue = {};
            break;
          case 'boolean':
            jsonValue = false;
            break;
          case 'string':
            jsonValue = value.Format === 'date-time' ? new Date() : 'example';
            break;
          case 'number':
          case 'integer':
            jsonValue = -1;
            break;
          default:
        }
      }
    } else if (modelList[value.Type]) {
      if (value.Relation) return result;
      jsonValue = generateJSON(value.Type, modelList[value.Type], modelList);
    } else {
      console.log('somthing wrong processing', value.Property);
      return result;
    }
    if (_.lowerCase(value.ParentType) === 'array') jsonValue = [jsonValue];
    result[value.Property] = jsonValue;
    return result;
  }, {});
}