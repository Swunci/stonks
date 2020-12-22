const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const path = require('path');
const del = require('del');
const runSequence = require('run-sequence');
const { series }= require('gulp');

const plugins = loadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**'],
  tests: './server/tests/**/*.test.js'
};

clean = () => {
  return del('dist/**');
}

nodemon = () => {
  plugins.nodemon({
    scripts: path.join('dist', 'app.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
  });
}

setEnv = () => {
  plugins.env({
    vars: {
      NODE_ENV: 'test'
    }
  });
}

test = async () => {
  setEnv();
  let exitCode = 0;
  return gulp.src([paths.tests], { read: false})
    .pipe(plugins.plumber())
    .pipe(plugins.mocha({
      reporter:'spec',
      ui: 'bdd',
      timeout: 2000,
    }))
    .once('error', (err) => {
      console.log(err);
      exitCode = 1;
    })
    .once('end', () => {
      process.exit();
    });
}

module.exports = {
  nodemon: nodemon,
  test: test,
  clean: clean,
  mocha: series(clean, test)
}
