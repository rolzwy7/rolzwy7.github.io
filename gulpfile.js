var gulp        = require("gulp");

gulp.task("copy_jekyll", function(){
    return gulp
    .src("jekyll/webapp/_site/**/*")
    .pipe(
        gulp.dest("home")
    )
});

gulp.task("default", ["copy_jekyll"], function () {
    gulp.watch("jekyll/webapp/_site/**/*", ["copy_jekyll"]);
});
