var gulp=require("gulp");
var $ = require('gulp-load-plugins')();//括号不能漏
var open = require('open');

var  app={
    srcPath:'src/',
    devPath:'build/',
    prdPath:'dist/'
};
//拷贝第三方js文件
gulp.task('lib',function () {//定义一个名为“lib”的任务 调用gulp lib
    gulp.src('webapp/**/*.js')//读取文件 加上后缀名锁定目标
        .pipe(gulp.dest(app.devPath)) //pipe拷贝文件
        .pipe(gulp.dest(app.prdPath))//dest写入文件
        .pipe($.connect.reload());//更新数据刷新页面

});
//拷贝html
gulp.task('html',function () {
    gulp.src(app.srcPath+"**/*.html")
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
});
//拷贝json文件
gulp.task('json',function () {
    gulp.src(app.srcPath+"data/*.json")
        .pipe(gulp.dest(app.devPath+'data'))
        .pipe(gulp.dest(app.prdPath+'data'))
        .pipe($.connect.reload());
});
//拷贝less文件
gulp.task('less',function () {
    gulp.src(app.srcPath+'style/index.less')
        .pipe($.less())
        .pipe(gulp.dest(app.devPath+'css'))
        .pipe($.cssmin())//发布到生产路径先压缩
        .pipe(gulp.dest(app.prdPath+'css'))
        .pipe($.connect.reload());
});
//拷贝js
gulp.task('js',function () {
    gulp.src(app.srcPath+'script/**/*.js')
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath+'js'))
        .pipe($.uglify())//发布到生产路径先压缩
        .pipe(gulp.dest(app.prdPath+'js'))
        .pipe($.connect.reload());
});
//拷贝image
gulp.task('image',function () {
    gulp.src(app.srcPath+'image/**/*')
        .pipe(gulp.dest(app.devPath+'image'))
        .pipe($.imagemin())//发布到生产路径先压缩
        .pipe(gulp.dest(app.prdPath+'image'))
        .pipe($.connect.reload());
});
//合并上面功能
gulp.task('build',['lib','html','json','less','js','image']);
//清除数据
gulp.task('clean',function () {
    gulp.src([app.devPath,app.prdPath])
        .pipe($.clean());
});
//自定义一个服务
gulp.task('serve',['build'],function () {
   $.connect.server({
       root:[app.devPath],
       livereload:true,
       port:8888
   });
   open('http://localhost:8888');
   //自动构建项目 添加监听
   gulp.watch('webapp/**/*.',['lib']);
   gulp.watch(app.srcPath+'**/*.html',['html']);
   gulp.watch(app.srcPath+'data/*.json',['json']);
   gulp.watch(app.srcPath+'style/index.less',['less']);
   gulp.watch(app.srcPath+'script/**/*.js',['js']);
   gulp.watch(app.srcPath+'image/**/*',['image']);
});
//设置默认任务
gulp.task('default',['serve']);
