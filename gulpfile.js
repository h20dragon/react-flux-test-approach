'use strict';

var argv = require('yargs').argv;

if( !process.env.NODE_ENV ){
    process.env.NODE_ENV = argv.env ? argv.env.toLowerCase() : "production";
}

if( !process.env.DEBUG ){
    if( Array.isArray(argv.debug) ){
        process.env.DEBUG = argv.debug.join(",");
    }else{
        process.env.DEBUG = argv.debug ? argv.debug : "false";
    }
}

var gulp = require('gulp');
var gulpif                      = require('gulp-if');
var del                         = require('del');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var path                        = require('path');
var projectPath                 = path.resolve( __dirname );
var webpack                     = require('webpack'),
    WebpackDevServer            = require("webpack-dev-server");



var srcAppsDir = getRelativePath('src', '**'),
    buildAreasDir = getRelativePath('build', 'areas', '**', "*");



var    env                         = process.env.NODE_ENV;
var isBuild = ( env === "build" )
var isDev                       = ( env === "development" );

if (isBuild) {
    console.log("YES");
}

gulp.task('minify', function () {
    gulp.src('./src/components/MemberList.jsx')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

//Build .json config file per page and copy files
gulp.task('build:config', (done) => {
    return gulp.src(getRelativePath( srcAppsDir, '!(*.md|*.markdown)'), {base: "./src"})
        //Transpile only js and jsx files
        .pipe(gulpif(isTranspilable, babel()))
        //Output them to the build folder
        .pipe(gulp.dest( "./build" ))
        //Filter only json files
        .pipe(gulpIgnore.include(isJson))
        //Feed our appRoutes obj with apps data
        .pipe(tap( populateObjects ))
        ;
});



function getRelativePath(){
    var arr = [ projectPath, path.resolve.apply(null, arguments) ],
        relativePath = path.relative.apply( null, arr )
        ;

    return relativePath;
}



gulp.task('start:webpack:minify', ['start:webpack'], (done) => {
    var webPackCompiler = webpack(webpackMinifierConfig(), (err, stats) => {
        if(err) throw new debug('webpack error', err);

        console.log(stats.toString({
            colors: true,
            children: false,
            chunks: false,
            chunkModules: false
        }));

        done();
    });
});

/**
 * CLEAN BUILD DIRECTORY
 */
gulp.task('clean:files', function (cb) {
    del([
        'build/**/*',
        'public/build/jscache/**/*'
    ], cb);
});


gulp.task('js', function() {
    return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'))
})

/**
 *    Run All
 */
gulp.task('build-jsx', function() {
        return gulp.src('src/**/*.jsx')
            //Transpile only js and jsx files
            .pipe(gulpif(isTranspilable, babel()))
            //Output them to the build folder
            .pipe(gulp.dest( "./build" ))
    }
)

gulp.task('build-js', function() {
        return gulp.src('src/**/*.js')
            //Transpile only js and jsx files
            .pipe(babel())
            //Output them to the build folder
            .pipe(gulp.dest( "./build" ))
    }
)

gulp.task('default', ['build-jsx', 'build-js'])


function isTranspilable(file) {
    var extname = path.extname(file.relative);
    return (extname === ".jsx" || extname === ".js") ? true : false;
}


