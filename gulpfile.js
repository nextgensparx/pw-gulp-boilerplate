const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const gutil = require('gulp-util');
const merge2 = require('merge2');
const concat = require('gulp-concat');
const webpack = require('webpack');
const webpackDevConfig = require('./build/webpack.dev.conf');
const webpackProdConfig = require('./build/webpack.prod.conf');

function ifEnv(env, funcReturn) {
    return process.env.NODE_ENV === env ? funcReturn : gutil.noop();
}

let config = {
    dir: {
        src: 'src',
        dest: 'dist/site',
    },
    sass: {
        entries: {
            'main': 'src/templates/scss/main.scss',
            // Add more css files here. The key is the filename
        },
        output: 'templates/css',
    },
};

config.copy = [
    // Copies all PHP files to ProcessWire install
    {
        watch: ['**/*.php'],
        from: config.dir.src+'/**',
        to: '', // relative to config.dir.dest
        ignore: ['templates/{js,js/**}', 'templates/{scss,scss/**}']
    }
    // To copy more files add another object
];


gulp.task('clean', function () {
    // Do not tamper with. Doing so could break ProcessWire.
    // Dry run first
    return del([
        config.dir.dest+'/templates/**/*',
        '!'+config.dir.dest+'/templates/admin.php',
        config.dir.dest+'/ready.php']);
});

gulp.task('copy', function () {
    let tasks = [];
    for (let copy of config.copy) {
        let src = [];
        src.push(copy.from);
        if (copy.ignore) {
            for (let ignore of copy.ignore) {
                src.push('!'+config.dir.src+'/'+ignore);
            }
        }

        let dest = config.dir.dest+'/'+copy.to;
        tasks.push(gulp.src(src)
            .pipe(gulp.dest(dest))
        );
    }
    return merge2(tasks);
});

gulp.task('build:scripts', function (done) {
    let isDev = process.env.NODE_ENV === 'development';
    let webpackConfig = isDev ? webpackDevConfig : webpackProdConfig;
    webpack(webpackConfig).run((err, stats) => {
        if (err) throw err;
        Object.keys(stats.compilation.assets).forEach(function(key) {
            gutil.log('Webpack: output ', gutil.colors.green(key));
        });
        gutil.log('Webpack finished');
        if (done) {
            done();
        }
    });
});

gulp.task('build:styles', function () {
    let tasks = [];
    for (let name in config.sass.entries) {
        if (Object.prototype.hasOwnProperty.call(config.sass.entries, name)) {
            let entry = config.sass.entries[name];
            tasks.push(gulp.src(entry)
                .pipe(ifEnv('development', sourcemaps.init()))
                .pipe(sass({includePaths: ['node_modules/']}).on('error', sass.logError))
                .pipe(concat(name+'.css'))
                .pipe(ifEnv('production', minifyCss()))
                .pipe(autoprefixer())
                .pipe(ifEnv('development', sourcemaps.write()))
                .pipe(gulp.dest(config.dir.dest+'/'+config.sass.output))
            );
        }
    }
    return merge2(tasks);
});

gulp.task('watch:sass', function() {
    gulp.watch(config.dir.src+'/**/*.scss', gulp.task('build:styles'));
});

gulp.task('watch:js', function() {
    gulp.watch(config.dir.src+'/**/*.js', gulp.task('build:scripts'));
});

gulp.task('watch:markup', function() {
    for (let copy of config.copy) {
        if (copy.watch) {
            gulp.watch(config.dir.src+'/'+copy.watch, gulp.task('copy'));
        }
    }
});

gulp.task('watch', gulp.parallel([
    'watch:sass',
    'watch:js',
    'watch:markup',
]));

gulp.task('build', gulp.series('clean', 'copy', 'build:styles', 'build:scripts'));

gulp.task('default', gulp.series('build', 'watch'));
