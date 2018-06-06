#!/usr/bin/env node

import generateJSONSchema from './generate-json-schema';
import generateJSONExample from './generate-json-example';
import validationUtil from './validationUtil';

const args = require('commander');
const path = require('path');
const chalk = require('chalk');

args.option('-i, --inputExcelFile <inputExcelFile>', '\'File Localtion\' which contains Schema definations', './example/advanced-sample.xlsx')
  .option('-s, --sheetName <sheetName>', '\'Sheet Name\' which contains Schema definations', 'Schema')
  .option('-o, --outputDir <outputDir>', '\'Output Directory\' where JSON Schema files should be generated', './dist')
  .option('-e, --embedded <embedded>', '\'embedded\' If embedded Schema should be generated', false)
  .option('-v, --versionSchema <versionSchema>', '\'Schema version\' contains Schema version', 'http://json-schema.org/draft-07/schema#')
  .parse(process.argv);

const inputExcelFile = path.resolve('.', args.inputExcelFile);
const sheetName = args.sheetName;
const outputDir = path.resolve('.', args.outputDir);
const embedded = args.embedded;
const versionSchema = args.versionSchema;

if (validationUtil(inputExcelFile, sheetName, outputDir)) {
  args.help();
} else {
  console.log(`\n inputExcelFile:${chalk.green(inputExcelFile)} \n sheetName:${chalk.green(sheetName)} \n outputDir:${chalk.green(outputDir)} \n versionSchema:${chalk.green(versionSchema)}\n`);
  generateJSONSchema(inputExcelFile, args.sheetName, path.join(outputDir, 'schema'), embedded, versionSchema);
  generateJSONExample(inputExcelFile, args.sheetName, path.join(outputDir, 'example'));
}
