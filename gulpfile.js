// Using CommonJS
const {src, dest, watch, parallel, series} = require('gulp');

// plugins
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');



function html() {
    return src('./src/html/*.html')
    .pipe(fileinclude())
    .pipe(dest('./src'))
    .pipe(browserSync.stream());
}

function styles() {
    return src( 'src/scss/app.scss', { sourcemaps: true })
    .pipe(concat('app.min.css'))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(autoprefixer()) 
    .pipe(dest('./src/css', { sourcemaps: true }))
    .pipe(browserSync.stream());
}

function scripts() {
    return src([
        // './node_modules/swiper/swiper-bundle.js',
     './src/js/index.js'
    // './src/js/**/*.js', '!./src/js/index.min.js'
    // { sourcemaps: true } doesn't work?
    ])
    .pipe(concat('index.min.js'))
    .pipe(terser())
    .pipe(dest('./src/js', { sourcemaps: true }))
    .pipe(browserSync.stream());
}

function watcher() {
    watch(['./src/scss/**/*.scss'], styles);
    watch(['./src/js/index.js'], scripts);
    watch(['./src/html/**/*.html'], html)
    watch('./src/*.html').on('change', browserSync.reload);
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    })
}

function cleanDist() {
    return src('./dist')
    .pipe(clean());
}

function builder() {
    return src ([
        './src/css/app.min.css',
        './src/js/index.min.js',
        './src/*.html'
    ], {base: 'src'})
    .pipe(dest('./dist'))
}

// exports.task_name = task_function
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.watcher = watcher;
exports.browsersync = browsersync;
exports.builder = builder;
exports.cleanDist = cleanDist;//removes dist folder!!! 
exports.build = series(cleanDist, builder);//dist folder must exist before running build task!!!

exports.default = parallel(html, styles, scripts, browsersync, watcher);

