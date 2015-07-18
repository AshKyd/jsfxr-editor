var gulp = require('gulp');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var zip = require('gulp-zip');
var through = require('through');
var fs = require('fs');
var less = require('gulp-less');
var browserify = require('browserify');

function browserifyTask(src, dest){
    var b = browserify({
        entries: src
    });
    return b.bundle()
        .pipe(fs.createWriteStream(dest));
}

gulp.task('js-index', function() {
    return browserifyTask('./src/scripts/index.js', 'dist/index.js');
});

gulp.task('js', ['js-index']);

gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('images', function(){
    gulp.src([
        'node_modules/leaflet-draw/dist/images/*',
        'node_modules/leaflet/dist/images/*',
        ])
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('css', function(){
    gulp.src('src/css/style.less')
        .pipe(less())
        .pipe(gulp.dest('dist/'));
});

gulp.task('connect', ['html', 'css', 'js'], function(){
    connect.server({
        root: 'dist',
        livereload: false
    });
});

gulp.task('chrome-dev', ['js'], function(){
    gulp.src([
        'src/chrome/**',
        'dist/**'
        ])
        .pipe(gulp.dest('chrome/'));
});

gulp.task('chrome-dist', ['chrome-dev'], function(){
    gulp.src([
        'chrome/**',
        ])
        .pipe(zip('chrome.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch(['src/index.html'], ['html']);
    gulp.watch(['src/**/*'], ['js']);
    gulp.watch(['src/css/**/*'], ['css']);
});

gulp.task('build',['js','css','html', 'images']);
gulp.task('deploy',['build','web-dist']);
gulp.task('default',['build','connect','watch']);
