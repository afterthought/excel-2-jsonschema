var gulp = require('gulp');
var path = require('path');
var combiner = require('stream-combiner2');
var runSequence = require('run-sequence');
var del = require('del');
var jsonminify = require('gulp-jsonminify');
var prettify = require('gulp-jsbeautifier');
var generateJSONSchema = require('./src/generate-json-schema');
var generateJSONExample = require('./src/generate-json-example');
var minimist = require('minimist');
var assert = require('assert');

var knownOptions = {
  string: ['inputExcelFile', 'sheetName', 'outputDir'],
  default: {
    inputExcelFile: 'example/sample.xlsx',
    sheetName: 'Schema',
    outputDir: 'dist'
  }
};

var jsonLogPrettify = function(text, obj) {
  console.log();
  console.log(text);
  console.log("=".repeat(text.length));
  console.log(JSON.stringify(obj, null, 4));
  console.log();
}

var args = minimist(process.argv.slice(2), knownOptions)

gulp.task('clean', function () {
  return del(args.outputDir)
})

gulp.task('readme', function (done) {
  var options = {
      inputExcelFile: 'example/sample.xlsx',
      sheetName: 'Schema',
      outputDir: 'dist'
  };  
  jsonLogPrettify("Output information", options);
  assert(args.inputExcelFile, 'Please provide Input Excel Sheet location');
  assert(args.sheetName, 'Please provide Sheet Name');
  assert(args.outputDir, 'Please provide Output dir location');
  generateJSONSchema(path.join(__dirname, options.inputExcelFile), options.sheetName, path.join(__dirname, options.outputDir));
  done();
});


gulp.task('generate-json-schema', function (done) {
  jsonLogPrettify("Output information", args);
  assert(args.inputExcelFile, 'Please provide Input Excel Sheet location');
  assert(args.sheetName, 'Please provide Sheet Name');
  assert(args.outputDir, 'Please provide Output dir location');
  generateJSONSchema(path.join(__dirname, args.inputExcelFile), args.sheetName, path.join(__dirname, args.outputDir));
  done();
});

gulp.task('generate-json-example', function (done) {
  jsonLogPrettify("Output information", args);
  assert(args.inputExcelFile, 'Please provide Input Excel Sheet location');
  assert(args.sheetName, 'Please provide Sheet Name');
  assert(args.outputDir, 'Please provide Output dir location');
  generateJSONExample(path.join(__dirname, args.inputExcelFile), args.sheetName, path.join(__dirname, args.outputDir));
  done();
});





gulp.task('lint', function () {
  var combined = combiner.obj([
    gulp.src(['./dist/*.json']),
    jsonminify(),
    prettify(),
    gulp.dest(args.outputDir)
  ])
  combined.on('error', console.error.bind(console))
  return combined
})

gulp.task('default', function task (done) {
  runSequence('clean', 'generate-json-schema', 'lint', done)
})
