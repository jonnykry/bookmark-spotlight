
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var babelify = require('babelify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
    var props = {
        entries: ['./src/js/' + file],
        debug : true
    };

    var bundler = watch ? watchify(browserify(props)) : browserify(props);
    bundler.transform(reactify);
    bundler.transform(babelify);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source('client-bundle.js'))
            .pipe(gulp.dest('./build/src/js'));
    }

    // listen for an update and run rebundle
    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });

    return rebundle();
}

gulp.task('default', ['build']);

gulp.task('build', ['css'], function() {
    return buildScript('client.jsx', false);
});

gulp.task('watch', ['build'], function() {
    return buildScript('client.jsx', true);
});

gulp.task('css', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/src/css/'));
});
