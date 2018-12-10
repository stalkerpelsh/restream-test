'use strict';

const gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    webserver = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    pug = require('gulp-pug'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    mqpacker = require('css-mqpacker'),
    imagemin = require('gulp-imagemin'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    del = require('del');


var onError = function (err) {
    console.log(err);
};

var configLocal = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000
};

var autoprefixerList = [
    'Chrome >= 45',
    'Firefox ESR',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 9',
    'Safari >= 9',
    'Android >= 4.4',
    'Opera >= 30'
];

var path = {
    build: {
        html: 'build/',
        js: 'build/assets/js/',
        css: 'build/assets/css/',
        img: 'build/assets/img/',
        fonts: 'build/assets/fonts/'
    },
    prod: {
        html: 'prod/',
        js: 'prod/assets/js/',
        css: 'prod/assets/css/',
        img: 'prod/assets/img/',
        fonts: 'prod/assets/fonts/'
    },
    src: {
        html: 'src/*.pug',
        js: 'src/js/*.*',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        mail: 'src/mail/**/*.*'
    },
    watch: {
        html: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        mail: 'src/mail/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: {
        build: './build',
        prod: './prod'
    }
};


gulp.task('css:build', function (cb) {
    const plugins = [
        autoprefixer({
            browsers: autoprefixerList
        }),
        mqpacker(),
        // cssnano()
    ];
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({
            stream: true
        }));
    cb();
});

gulp.task('html:build', function (cb) {
    gulp.src(path.src.html)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(webserver.reload({
            stream: true
        }));
    cb();
});

gulp.task('js:build', function () {
    return gulp.src('./src/js/*.js')
        .pipe(rigger())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({
            stream: true
        }));
});

gulp.task('image:build', function (cb) {
    gulp.src(path.src.img) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({
                interlaced: true
            }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            })
        ])))
        .pipe(gulp.dest(path.build.img));
    cb();
});

gulp.task('fonts:build', function (cb) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
    cb();
});


gulp.task('css:prod', function (cb) {
    const plugins = [
        autoprefixer({
            browsers: autoprefixerList
        }),
        mqpacker(),
        cssnano()
    ];
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(gulp.dest(path.prod.css))
    cb();
});

gulp.task('html:prod', function (cb) {
    gulp.src(path.src.html)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.prod.html))
    cb();
});

gulp.task('js:prod', function () {
    return gulp.src('./src/js/*.js')
        .pipe(rigger())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.prod.js))
});

gulp.task('image:prod', function (cb) {
    gulp.src(path.src.img)
        .pipe(cache(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            })
        ])))
        .pipe(gulp.dest(path.prod.img));
    cb();
});

gulp.task('fonts:prod', function (cb) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.prod.fonts));
    cb();
});

gulp.task('clean:build', function (cb) {
    del.sync(path.clean.build);
    cb();
});

gulp.task('clean:prod', function (cb) {
    del.sync(path.clean.prod);
    cb();
});

gulp.task('cache:clear', function (cb) {
    cache.clearAll();
    cb();
});

gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.style, gulp.series('css:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

gulp.task('webserver', function (cb) {
    webserver.init({
        server: {
            baseDir: "./build"
        },
        tunnel: false,
        host: 'localhost',
        port: 9000
    });
    cb();
});

gulp.task('build', gulp.series(gulp.parallel('clean:build',
    'html:build',
    'css:build',
    'js:build',
    'fonts:build',
    'image:build')));

gulp.task('prod', gulp.series(gulp.parallel('clean:prod',
    'html:prod',
    'css:prod',
    'js:prod',
    'fonts:prod',
    'image:prod')));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'webserver')));