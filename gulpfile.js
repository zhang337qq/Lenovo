//引入响应的包
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify")
const babel = require("gulp-babel")
const connect = require("gulp-connect")
const sass =require("gulp-sass")
//定制任务,执行任务
//这个名称可以随便取  第一个是一个参数 第二个是回调函数
//这里就用不到
// gulp.task("default", ()=>{
//     console.log("i love you")
// })

//指定一个压缩html的任务
gulp.task("html", ()=>{
    gulp.src("src/**/*.html")
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }))
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());

})

//压缩 css 的任务
gulp.task("css",() =>{
    gulp.src("src/css/**/*.scss")
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());

})

//现在制定压缩js 任务  但是要先把es6 转换成es5才能压缩js 文件
//现在指定一个es6 转化成es5 的任务
gulp.task("js", () =>{
    gulp.src("src/js/**/*.js")
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
})

//现在制定一个压缩  图片 并且移动
gulp.task("img", () =>{
    gulp.src("src/images/**/*")
        .pipe(gulp.dest("dist/images"))
})

//制定一个开启服务器的任务
gulp.task("server", ()=>{
    connect.server({
        root:"dist",
        //端口号  可以随意写 希望是什么就写什么就可以  只能填写 2-4为数字 只能为纯数字
        port: 9999,
        //这个也就是热更新   如果内容有修改 那么页面会自动进行刷新
        livereload:true
    })
})

//现在移动libs
gulp.task("libs", () =>{
    gulp.src("src/libs/**/*")
        .pipe(gulp.dest("dist/libs"))
})

//现在指定一个watch任务监听事件的改变
gulp.task("watch", ()=>{
    gulp.watch("src/**/*.html",['html'])
    gulp.watch("src/css/*.scss",['css'])
    gulp.watch("src/js/*.js",['js'])
})

//现在吧所有要执行的任务放在一起
gulp.task("default",["html", "css", "js", "server", "img", "libs", "watch"])