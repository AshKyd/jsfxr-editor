var gulp = require('gulp');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
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

gulp.task('connect', ['html', 'js'], function(){
    connect.server({
        root: 'dist',
        livereload: false
    });
});

gulp.task('watch', function () {
    gulp.watch(['src/index.html'], ['html']);
    gulp.watch(['src/**/*'], ['js']);
});

gulp.task('build',['js','html', 'images']);
gulp.task('deploy',['build','web-dist']);
gulp.task('default',['build','connect','watch']);
