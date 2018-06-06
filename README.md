[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Dependency Status](https://tidelift.com/badges/github/hugorper/excel-2-jsonschema)](https://tidelift.com/badges/github/hugorper/excel-2-jsonschema) [![Build Status](https://travis-ci.org/hugorper/excel-2-jsonschema.svg?branch=master)](https://travis-ci.org/hugorper/excel-2-jsonschema)

# A tool to generate JSON Schema files from Excel Sheet

## Why

 [JSON Schema](http://json-schema.org/) creation is difficult, especially for non-technical people. Excel is widely used and proves to be a good tool for defining schema

## Excel-2-jsonschema CLI tool?

The **excel-2-jsonschema** CLI tool, allows to generate [JSON Schema](http://json-schema.org/) from Excel Sheet table.

## Excel Table (input)

|Name|Property|Type|Description|
|----|--------|----|------------|
|Hotel|Id|string|Hotel unique identifier.|
|Hotel|description|string|Hotel description.|
|Hotel|displayName|string|Display name of hotel.|
|Hotel|capacity|string|Capacity of the hotel, ex: 44 people.|
|Hotel|image|string|Image URL representing the hotel.|

## JSON Schema (output)

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "hotel",
    "description": "hotel",
    "type": "object",
    "properties": {
        "id": {
            "description": "Hotel unique identifier.",
            "type": "string"
        },
        "description": {
            "description": "Hotel description.",
            "type": "string"
        },
        "displayName": {
            "description": "Display name of hotel.",
            "type": "string"
        },
        "capacity": {
            "description": "Capacity of the hotel, ex: 44 people.",
            "type": "string"
        },
        "image": {
            "description": "Image URL representing the hotel.",
            "type": "string"
        }
    },
    "required": []
}
```

## CLI Tool (global mode)

### CLI install

```npm install -g @hugorper/excel-2-jsonschema```

### CLI Usage

```
How to Execute (with default args -e -v):
  excel-2-jsonschema -i ./sample.xls -s Schema -o ./dist 

Usage: excel-2-jsonschema [options]
  Options:
  -i, --inputExcelFile <inputExcelFile>  'File Localtion' which contains Schema definations
  -s, --sheetName <sheetName>            'Sheet Name' which contains Schema definations
  -o, --outputDir <outputDir>            'Output Directory' where JSON Schema files should be generated## Install
  -e, --embedded <embedded>              'Embedded' If embedded Schema should be generated (default: false)
  -v, --versionSchema <versionSchema>'    Contains Schema version (default: http://json-schema.org/draft-07/schema#)
```

## Developer 

### Install

```npm install @hugorper/excel-2-jsonschema --save-dev```

### Usage

Generate schemas.

```js
const generateJSONSchema = require('generate-json-schema');
const path = require('path');

var options = {
    inputExcelFile: path.join(__dirname, 'example/sample.xlsx'),
    outputDir: path.join(__dirname, 'dist'),
    sheetName: 'Schema',
    embedded: false,
    versionSchema: 'http://json-schema.org/draft-07/schema#'  
};


generateJSONSchema(options.inputExcelFile, options.sheetName, options.outputDir, options.embedded, options.versionSchema);
```

Generate json example files.

```js
const generateJSONExample = require('./src/generate-json-example');
const path = require('path');

var options = {
    inputExcelFile: path.join(__dirname, 'example/sample.xlsx'),
    outputDir: path.join(__dirname, 'dist'),
    sheetName: 'Schema'  
};

generateJSONExample(options.inputExcelFile, options.sheetName, options.outputDir);
```

## List Gulp Tasks 

* clean: clean all output files
* schema: Use generate json
* example: Run example json output
* build: Build project
* lint: execute lint

For more informations about npm run-script, go to _scripts_ of file _package.json_.

## Excel sample files

* [sample.xlsx](https://github.com/hugorper/excel-2-jsonschema/example/sample.xlsx)
* [advanced-sample.xlsx](https://github.com/hugorper/excel-2-jsonschemaa/example/advanced-sample.xlsx)
