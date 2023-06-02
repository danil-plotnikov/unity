let preprocessor = 'sass';
const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagecomp = require('compress-images');
const clean = require('gulp-clean');




function browsersync() {
	browserSync.init({
		server: { baseDir: 'src/' },
		notify: false,
		online: true
	})
}

function scripts() {
	return src([ 
		'node_modules/jquery/dist/jquery.min.js', 
		'src/js/main.js', 
		])
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('src/js/'))
	.pipe(browserSync.stream())
}

function styles() {
	return src('src/' + preprocessor + '/main.' + preprocessor + '')
	.pipe(eval('sass')())
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
	.pipe(dest('src/css/'))
	.pipe(browserSync.stream())
}

async function images() {
	imagecomp(
		"src/img/src/**/*", 
		"src/img/dest/", 
		{ compress_force: false, statistic: true, autoupdate: true }, false, 
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, 
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { 
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

function cleanimg() {
	return src('src/img/dest/', {allowEmpty: true}).pipe(clean())
}



function buildcopy() {
	return src([
		'src/fonts/*',
		'src/css/**/*.min.css',
		'src/js/**/*.min.js',
		'src/img/dest/**/*',
		'src/**/*.html',
		], { base: 'src' })
	.pipe(dest('dist'))
}

function cleandist() {
	return src('dist', {allowEmpty: true}).pipe(clean())
}

function startwatch() {
	watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
	watch('src/**/' + preprocessor + '/**/*', styles);
	watch('src/**/*.html').on('change', browserSync.reload);
	watch('src/img/src/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;

exports.build = series(cleandist, styles, scripts, images, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);


