var gulp = require('gulp')
var uglify = require('gulp-uglify')
gulp.task('script', done => {
gulp.src('kqDatePicker.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    done()
})