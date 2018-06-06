'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-use-before-define  */

var chalk = require('chalk');
var fs = require('fs-extra');
var XLSX = require('xlsx');

exports.default = function (inputExcelFile, sheetName, outputDir) {
  var invalidArgs = false;

  if (!isExcelFile(inputExcelFile, sheetName)) {
    console.error(chalk.red(inputExcelFile + ' is not a valid Excel File'));
    invalidArgs = true;
  } else if (!hasSheet(inputExcelFile, sheetName)) {
    console.error(chalk.red(sheetName + ' is not a valid Sheet name with in Excel File'));
    invalidArgs = true;
  }

  if (!isDirectory(outputDir)) {
    console.error(chalk.red(outputDir + ' is not a valid Directory'));
    invalidArgs = true;
  }
  return invalidArgs;
};

function isExcelFile(fileName) {
  try {
    var stats = fs.statSync(fileName);
    if (stats.isFile()) {
      XLSX.readFile(fileName);
      return true;
    }
  } catch (err) {
    return false;
  }
  return undefined;
}

function hasSheet(fileName, sheetName) {
  try {
    return XLSX.readFile(fileName).Sheets[sheetName] !== undefined;
  } catch (err) {
    return false;
  }
}

function isDirectory(folderName) {
  try {
    fs.emptyDirSync(folderName);
    return fs.statSync(folderName).isDirectory();
  } catch (err) {
    return false;
  }
}