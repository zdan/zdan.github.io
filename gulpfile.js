/**
 * Created by Administrator on 2015/2/4 0004.
 */
// 定义依赖项和插件
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');

var paths = {
  css: ['./build/css/style.css', './build/css/pygments-monokai.css']
};

//合并压缩js
gulp.task('js', function () {
  gulp.src(['./assets/js/lib/jquery-1.11.2.min.js'])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./assets/js/'));
});

//合并压缩css
gulp.task('css', function () {
  gulp.src(['./assets/js/lib/bootstrap/css/bootstrap.min.css',
    './build/css/style.css',
    './build/css/pygments-monokai.css'])
    .pipe(minifyCss())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./assets/css/'));
});

//监视任务
gulp.task('watch', function () {
  gulp.watch(paths.css, ['css']);
});

// 定义默认任务
gulp.task('default', ['watch', 'css']);