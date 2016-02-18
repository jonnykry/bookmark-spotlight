
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var _ = require('lodash');

var customOpts = {
    entries: ['./src/js/client.jsx'],
    debug: true
};

var path = {
    HTML: 'src/popup.html',
    ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/popup.html'],
    JS: ['src/js/*.js', 'src/js/**/*.js'],
    MINIFIED_OUT: 'client-bundle-min.js',
    BUILD_PATH: 'build/js'
}

var opts = _.assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

b.transform(reactify);

gulp.task('watch', ['lint'], bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('client-bundle.js'))
        .pipe(buffer())
        .pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.client-bundle.js', '-min.js']
        }))
        .pipe(gulp.dest('./build/js'));
}

gulp.task('build', function(){
    gulp.src(path.JS)
        .pipe(react())
        .pipe(concat(path.MINIFIED_OUT))
        .pipe(uglify(path.MINIFIED_OUT))
        .pipe(gulp.dest(path.BUILD_PATH));
});

gulp.task('lint', function () {
    return gulp.src(['**/*.js','!node_modules/**', '!build/**/*.js'])
        .pipe(eslint())
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
