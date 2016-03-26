var gulp = require('gulp');
var webpack = require('gulp-webpack');
gulp.task('default', function(){
    return gulp.src('src/app.js')
        .pipe(webpack(require('./webpack.default.cfg.js')))
        .pipe(gulp.dest('dist/'));
});