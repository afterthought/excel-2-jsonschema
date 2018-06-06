#!/usr/bin/env node
'use strict';

var _generateJsonSchema = require('./generate-json-schema');

var _generateJsonSchema2 = _interopRequireDefault(_generateJsonSchema);

var _generateJsonExample = require('./generate-json-example');

var _generateJsonExample2 = _interopRequireDefault(_generateJsonExample);

var _validationUtil = require('./validationUtil');

var _validationUtil2 = _interopRequireDefault(_validationUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = require('commander');
var path = require('path');
var chalk = require('chalk');

args.option('-i, --inputExcelFile <inputExcelFile>', '\'File Localtion\' which contains Schema definations', './example/advanced-sample.xlsx').option('-s, --sheetName <sheetName>', '\'Sheet Name\' which contains Schema definations', 'Schema').option('-o, --outputDir <outputDir>', '\'Output Directory\' where JSON Schema files should be generated', './dist').option('-e, --embedded <embedded>', '\'embedded\' If embedded Schema should be generated', false).option('-v, --versionSchema <versionSchema>', '\'Schema version\' contains Schema version', 'http://json-schema.org/draft-07/schema#').parse(process.argv);

var inputExcelFile = path.resolve('.', args.inputExcelFile);
var sheetName = args.sheetName;
var outputDir = path.resolve('.', args.outputDir);
var embedded = args.embedded;
var versionSchema = args.versionSchema;

if ((0, _validationUtil2.default)(inputExcelFile, sheetName, outputDir)) {
  args.help();
} else {
  console.log('\n inputExcelFile:' + chalk.green(inputExcelFile) + ' \n sheetName:' + chalk.green(sheetName) + ' \n outputDir:' + chalk.green(outputDir) + ' \n versionSchema:' + chalk.green(versionSchema) + '\n');
  (0, _generateJsonSchema2.default)(inputExcelFile, args.sheetName, path.join(outputDir, 'schema'), embedded, versionSchema);
  (0, _generateJsonExample2.default)(inputExcelFile, args.sheetName, path.join(outputDir, 'example'));
}