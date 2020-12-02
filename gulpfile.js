const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const jsmin = require("gulp-jsmin");
const rename = require("gulp-rename");
const del = require("del");

const clean = () => {
  return del(["docs"]);
}

exports.clean = clean;

const copy = () => {
  return gulp.src([
      "source/*.html",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("docs"));
};

exports.copy = copy;

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const stylesMin = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({
      suffix: "-min"
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("docs/css"))
    .pipe(sync.stream());
}

exports.stylesMin = stylesMin;

const jsStyles = () => {
  return gulp.src("source/js/*.js")
    .pipe(jsmin())
    .pipe(rename({
      suffix: "-min"
    }))
    .pipe(gulp.dest("docs/js"));
}

exports.jsStyles = jsStyles;

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
  gulp.watch("docs/less/**/*.less", gulp.series("stylesMin"));
  gulp.watch("docs/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);


const build = (done) => {
  gulp.series(
    clean, copy, stylesMin, jsStyles
  )(done);
};

exports.build = build;

exports.start = gulp.series(
  build, server, watcher
);