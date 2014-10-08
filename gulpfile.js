/*jshint node:true*/

"use strict";

var gulp = require("gulp"),
    path = require("path"),
    destFolder = __dirname + "/public";

gulp.task("default", ["watch", "express"]);

gulp.task("watch", function () {
    gulp.watch(__dirname + "/styles/**/*.scss", ["sass"]);
    gulp.watch([
        __dirname + "/app/**/*.js",
        __dirname + "/app/**/*.jsx"
    ], ["uglify"]);
});

gulp.task("express", function () {
    var express = require("express"),
        app = express(),
        lr = require("tiny-lr")(),
        publicDir = path.join(__dirname, "public");

    app.use(require("connect-livereload")());
    app.use(express.static(publicDir));

    app.get("*", function (request, response) {
        response.sendFile(publicDir + "/index.html");
    });

    app.listen(3000);
    lr.listen(35729);

    console.log("\n" +
        "===============================================\n" +
        " Application running at: http://localhost:3000 \n" +
        "===============================================\n"
    );

    gulp.watch([
        publicDir + "/css/style.css",
        publicDir + "/js/app.min.js",
        publicDir + "/*.html"
    ], function (event) {
        var filename = path.relative(publicDir, event.path);

        lr.changed({
            body: {
                files: [filename]
            }
        });
    });
});

gulp.task("sass", function () {
    var sass = require("gulp-sass");

    return gulp.src(__dirname + "/styles/style.scss")
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                __dirname + "/styles",
                __dirname + "/styles/elements",
                __dirname + "/styles/components/layout",
                __dirname + "/styles/components/pages",
                __dirname + "/styles/components/ui"
            ],
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest(destFolder + "/css"));
});

gulp.task("uglify", ["webpack"], function () {
    var uglify = require("gulp-uglify"),
        rename = require("gulp-rename");

    gulp.src(destFolder + "/js/app.js")
        .pipe(rename("app.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(destFolder + "/js"));
});

gulp.task("webpack", function (callback) {
    var util = require("gulp-util"),
        webpack = require("webpack"),
        webpackConfig = require(__dirname + "/webpack.config.js");

    webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw new util.PluginError("webpack", err);
        }

        util.log("[webpack]", stats.toString({}));
        callback();
    });
});
