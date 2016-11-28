/**
 * Created by ivokroon on 17/11/2016.
 */
var gulp = require('gulp'),
    nodemon = require("gulp-nodemon");

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env:{
            PORT:80
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log("Restarting");
    })
});