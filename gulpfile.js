/*global require*/
"use strict";
var gulp = require('gulp'),
    path = require('path'),
    data = require('gulp-data'),
    twig = require('gulp-twig'), // Decided to use twig instead of pug, because already familiar with it
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    fs = require('fs'),
    svgo = require('gulp-svgo'),
    svgSymbols = require('gulp-svg-symbols'),
    imagemin = require('gulp-imagemin');
/*
 * Directories here
 */
var paths = {
    build: './build/',
    sass: './assets/scss/',
    css: './build/css/',
    data: './data/',
    templates: './templates/',
    svgSrc: './assets/svg/',
    svgDest: './build/svg/',
    imgSrc: './assets/images/',
    imgDest: './build/images/',
};



/**
 * minify images with imagemin
 */
gulp.task('images', () => {
    return gulp.src(paths.imgSrc + '**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.imgDest))
});
/**
 * minify svgs's with svgo
 */
gulp.task('svgs', () => {
    return gulp.src(paths.svgSrc + '*.svg')
        .pipe(svgo({
            plugins: [
                {
                    removeViewBox: false,
                }, {
                    addClassesToSVGElement: {
                        classNames: ['svgo'],
                    },
                },
            ],
        }))
        .pipe(gulp.dest(paths.svgDest));
});
/**
 * minify svgs's with svgo
 */
gulp.task('svg-symbols', () => {
    return gulp.src(paths.svgSrc + 'to-symbol-map/' + '*.svg')
        .pipe(svgSymbols())
        .pipe(gulp.dest(paths.svgDest));
});
/**
 * Compile .twig files and pass data from json file
 * matching file name. index.twig - index.twig.json into HTMLs
 */
gulp.task('twig', function () {
    return gulp.src([paths.templates + '*.twig'])
    // Stay live and reload on error
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(data(function (file) {
            return JSON.parse(fs.readFileSync(paths.data +
                path.basename(file.path) + '.json'));
        }))
        .pipe(twig())
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest(paths.build));
});
/**
 * Recompile .twig files and live reload the browser
 */
gulp.task('rebuild', ['twig'], function () {
    // BrowserSync Reload
    browserSync.reload();
});
/**
 * Wait for twig and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'svgs', 'svg-symbols', 'images', 'twig'], function () {
    browserSync({
        server: {
            baseDir: paths.build
        },
        notify: false,
        browser:"google chrome"
    });
});
/**
 * Compile .scss files into build css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
    return gulp.src(paths.sass + 'main.scss')
        .pipe(sourcemaps.init())
        // Stay live and reload on error
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(
            sass({
                includePaths: [paths.sass + 'vendors/'],
                outputStyle: 'expanded'
            }).on('error', function (err) {
                console.log(err.message);
                this.emit('end');
            })
        )
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css));
});
/**
 * Watch scss files for changes & recompile
 * Watch .twig files run twig-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(paths.sass + '**/*.scss', ['sass', browserSync.reload]);
    gulp.watch(paths.svgSrc + '**/*.svg', ['svgs', 'svg-symbols', browserSync.reload]);
    gulp.watch(paths.imgSrc + '**/*', ['images', browserSync.reload]);
    gulp.watch([
            paths.templates + '**/*.twig',
            paths.data + '**/*.twig.json'
        ],
        {cwd:'./'},
        ['rebuild']
    );
});
// Build task compile sass and twig.
gulp.task('build', ['sass', 'svgs', 'svg-symbols', 'images', 'twig']);
/**
 * Default task, running just `gulp` will compile the sass,
 * compile the project site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);