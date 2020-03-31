const source = require('vinyl-source-stream');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const util = require('gulp-util');
const doxdox = require('doxdox');
const gulp = require('gulp');
const del = require('del');
const fs = require('fs');

/**
 * Generates a build options object.
 *
 * @param {Boolean} min Whether to minify output.
 *
 * @returns {Object} The options object.
 */
function getOptions (min = false) {
  return {
    browserify: {
      entries: './lib/index.js',
      standalone: 'fx-solve',
      debug: true
    },
    rename: {
      extname: min ? '.min.js' : '.js',
      basename: 'fx-solve'
    },
    babelify: {
      presets: ['@babel/preset-env']
    },
    uglify: {
      mangle: min,
      compress: {
        conditionals: min,
        drop_console: min,
        if_return: min,
        join_vars: min,
        sequences: min,
        dead_code: min,
        booleans: min,
        unused: min
      },
      output: {
        beautify: !min
      }
    }
  };
}

/**
 * Builds the dist versions for the browser.
 *
 * @param {Boolean} min Whether the output should be minified.
 *
 * @returns {Object} The gulp stream object.
 */
function build (min) {
  const options = getOptions(min);
  const stream = browserify(options.browserify)
    .transform('babelify', options.babelify)
    .bundle();

  return stream
    .pipe(source('bundle.tmp.js'))
    .pipe(buffer())
    .pipe(uglify(options.uglify).on('error', util.log))
    .pipe(rename(options.rename))
    .pipe(gulp.dest('dist'));
}

/** Dists */

const cleanupDist = () => del('dist/*.js');
const compileDist = () => build(false);
const minifyDist = () => build(true);

/** Documentation */

const cleanupDocs = () => del('docs/**.*');

const compileDocs = async () => {
  const content = await doxdox.parseInputs(['lib/**/*.js'], {
    layout: 'markdown',
    parser: 'dox'
  });

  fs.writeFileSync('DOCUMENTATION.md', content);
};

const dist = gulp.series(cleanupDist, compileDist, minifyDist);
const docs = gulp.series(cleanupDocs, compileDocs);

module.exports.default = gulp.series(dist, docs);
module.exports.dist = dist;
module.exports.docs = docs;
