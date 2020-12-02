const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

const clean = () => {
  return del("build");
}

// Styles

const styles = () => {
  return gulp.src("docs/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("docs/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'docs'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("docs/less/**/*.less", gulp.series("styles"));
  gulp.watch("docs/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);


const build = (done) => {
  gulp.series(
    clean
  )(done);
};

exports.build = build;