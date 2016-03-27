var gulp = require('gulp');
var util = require('gulp-util');
var webpack = require('gulp-webpack');
gulp.task('default', function(){
    if (util.env.production) {
        return gulp.src('src/app/app.js')
            .pipe(webpack(require('./webpack.production.cfg.js')))
            .pipe(gulp.dest('dist/'));
    }
    return gulp.src('src/app/app.js')
        .pipe(webpack(require('./webpack.default.cfg.js')))
        .pipe(gulp.dest('dist/'));
});