const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('webserver', () => {
  gulp.src('experiment')
  .pipe(webserver({
    livereload: true,
    open: true,
  }));
});

gulp.task('default', ['webserver']);

