/**
 * Created by christiankalig on 11.05.17.
 */

const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const API_DOC = ['src/apidoc/**/*'];

const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function() {
    return gulp.src(JSON_FILES).pipe(gulp.dest('dist'));
});

gulp.task('documentation', function(){
    return gulp.src(API_DOC).pipe(gulp.dest('dist/apidoc'));
});

gulp.task('default', ['watch', 'assets', 'documentation']);