var less = require('less');
var fs = require('fs-extra');
var autoprefixer = require('autoprefixer-core');
var Mustache = require('mustache');

// configuration for LESS/CSS
var mainLess = 'stylesheets/main.less';
var compress = false;
var distDir = 'dist';
var cssTargetDir = distDir + '/stylesheets'
var cssFile = cssTargetDir + '/main.css';

// configuration for other assets

var imgDir = 'img';
var jsFiles = [
  {file: 'jquery.min.js', dir: 'node_modules/jquery/dist'},
  {file: 'bootstrap.min.js', dir: 'node_modules/bootstrap/dist/js'}]
var jsDistDir = distDir + '/js';

// configuration for HTML

var htmlDir = 'html';
var layoutTpl = htmlDir + '/layout.mustache';
var htmlTargetDir = distDir;

var namesAndTitles = 
{
  index: 'A Pattern Collection for RESTful Conversations',
  rest: 'REST & RESTalk DSL',
  references: 'References',
  contribute: 'Contribute',
  imprint: 'Imprint & Contact',
  'post-put': 'Pattern: POST-PUT Creation',
  'long-running-operation-polling': 'Pattern: Long Running Operation with Polling',
  '404': 'A Pattern Collection for RESTful Conversations'
}

var ensureDir = function(dirName, cb) {
  fs.mkdir(dirName, function(error, data) {
    if (error && error.code !== 'EEXIST') {
      console.log('Could not create directory:', dirName);
      console.log('Error:', error);
    } else {
      cb();
    }
  });
};

var buildCss = function() {
  ensureDir(cssTargetDir, function() {
    fs.readFile(mainLess, {encoding: 'utf8'}, function ( error, data ) {
      if (error) {
        console.log('Could not read:', mainLess);
        console.log('Error:', error);
      } else {
        var lessCode = data;
        less.render(lessCode, 
          {
            paths: ['.', './stylesheets', './node_modules/bootstrap/less'],  // Specify search paths for @import directives
            filename: 'style.less',         // Specify a filename, for better error messages
            compress: compress              // Minify CSS output
          },
          function (error, output) {
            if (error) {
              console.log('Processing LESS failed:', error);
            } else {
              var prefixedCss = autoprefixer.process(output.css).css;
              fs.writeFile(cssFile, prefixedCss, {encoding: 'utf8'}, function(error, data) {
                if (error) {
                  console.log('Could not write CSS:', error);
                } else {
                  console.log('CSS written to:', cssFile);
                }
              });
            }
          }
        );
      }
    });
  });
};

var compileTemplate = function(layoutTpl, viewName) {
  var tplName = htmlDir + '/' + viewName + '.mustache';
  fs.readFile(tplName, {encoding: 'utf8'}, function(error, data) {
     if (error) {
      console.log('Could not read:', tplName);
      console.log('Error:', error);
    } else {
      var content = Mustache.render(data, {});
      var viewData = {
        pageContent: content,
        title: namesAndTitles[viewName]
      };
      viewData[viewName] = true;
      var outFile = htmlTargetDir + '/' + viewName + '.html';
      fs.writeFile(outFile, Mustache.render(layoutTpl, viewData), {encoding: 'utf8'}, function(error, data) {
        if (error) {
          console.log('Could not write HTML:', error);
        } else {
          console.log('HTML written to:', outFile);
        }
      });
    }
  });
};


var buildHtml = function() {
  ensureDir(htmlTargetDir, function() {
    fs.readFile(layoutTpl, {encoding: 'utf8'}, function ( error, data ) {
      if (error) {
        console.log('Could not read:', layoutTpl);
        console.log('Error:', error);
      } else {
        for (var viewName in namesAndTitles) {
          compileTemplate(data, viewName);
        }
      }
    });
  });
};

var copyFile = function(srcDir, fileName, targetDir) {
  var src = srcDir + '/' + fileName;
  var dest = targetDir + '/' + fileName;
  fs.copy(src, dest, function (error) {
    if (error) {
      console.log('Could not copy', src, 'to', dest, ':', error);
    } else {
      console.log('Copied', src, 'to', dest);
    }
  });
}

var copyAssets = function() {
  // copy img dir
  fs.copy(imgDir, distDir + '/' + imgDir, function (error) {
    if (error) {
      console.log('Could not copy image directory:', error);
    } else {
      console.log('Image directory copied');
    }
  });
  // copy js
  for (var i in jsFiles) {
    var srcFile = jsFiles[i];
    copyFile(srcFile.dir, srcFile.file, jsDistDir);
  }
};

ensureDir(distDir, function() {
  buildCss();
  buildHtml();
  copyAssets();
});

