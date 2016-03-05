
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');

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

    // watchify() if watch requested, otherwise run browserify() once
    var bundler = watch ? watchify(browserify(props)) : browserify(props);
    bundler.transform(reactify);
    bundler.transform(babelify);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source('client-bundle.js'))
            .pipe(gulp.dest('./build/js'));
    }

    // listen for an update and run rebundle
    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });

    // run it once the first time buildScript is called
    return rebundle();
}

// run once
gulp.task('default', ['build']);

// run once
gulp.task('build', function() {
    return buildScript('client.jsx', false);
});

// run 'build' task first, then watch for future changes
gulp.task('watch', ['build'], function() {
    return buildScript('client.jsx', true);
});

