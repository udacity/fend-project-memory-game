const gulp= require('gulp');
const browserSync=require('browser-sync').create();
const autoPrefixer=require('gulp-autoprefixer');
const eslint=require('gulp-eslint');
const uglify=require('gulp-uglify-es').default;
const babel=require('gulp-babel');
// const jasmine=require('gulp-jasmine-phantom');


gulp.task('default',['copy-html','copy-images','styles', 'lint','scripts'],function(){
	gulp.watch('./src/css/**/*.css',['styles']);
	gulp.watch('./dist/css/**/*.css').on('change',browserSync.reload);
	gulp.watch('./src/js/**/*.js',['lint']);
	gulp.watch('./dist/js/**/*.js').on('change',browserSync.reload);
	gulp.watch('./src/index.html',['copy-html']);
	gulp.watch('./dist/index.html').on('change',browserSync.reload);

	browserSync.init({
		server: './dist'
	});
});

gulp.task('copy-html',function(){
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images',function(){
	gulp.src('./src/img/*')
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('styles',function(){
	gulp.src('./src/css/**/*.css')
		.pipe(autoPrefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('lint',function(){
	return gulp.src(['./src/js/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());

});

gulp.task('scripts',function(){
	gulp.src('./src/js/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts-dist',function(){
	gulp.src('./src/js/**/*.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});