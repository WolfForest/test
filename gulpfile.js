var 
    gulp = require('gulp'), // Сообственно Gulp JS
    jade = require('gulp-jade'), // Плагин для Jade
    less = require('gulp-less'), // Плагин для less,
    connect = require('gulp-connect'),
    csso = require('gulp-csso'), // Минификация CSS
    imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'); // Склейка файлов
//var imageResize = require('gulp-image-resize');

// Собираем Stylus
gulp.task('less', function() {
    gulp.src(['./assets/styles/*.css', './assets/styles/*.less'])
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
});

// fonts
gulp.task('fonts', function() {
    gulp.src(['./assets/fonts/**/*'])
        .pipe(gulp.dest('./public/fonts'))
        .pipe(connect.reload());
});

// Собираем html из Jade
gulp.task('jade', function() {
    gulp.src(['./assets/template/*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('./public/')) // Записываем собранные файлы
    .pipe(connect.reload()); // даем команду на перезагрузку страницы
}); 

// Собираем JS
gulp.task('js', function() {
    gulp.src(['./assets/js/vendor/**/*.js'])
        .pipe(gulp.dest('./public/js'));
    gulp.src(['./assets/js/jquery*.js', './assets/js/bootstrap*.js', './assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('app.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
        .pipe(gulp.dest('./public/js'))
        .pipe(connect.reload()); // даем команду на перезагрузку страницы
});

// Копируем и минимизируем изображения
gulp.task('images', function() {
    /*gulp.src('./assets/img/*.svg')
        .pipe(gulp.dest('./public/css/img'));*/
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/css/img'));

});

gulp.task('connect', function() {
    connect.server({
        port: 8080,
        livereload: true,
        root: "./public/"
    });
});

// Запуск сервера разработки gulp watch
gulp.task('watch', function() {
    // Предварительная сборка проекта
    gulp.run('less');
    gulp.run('fonts');
    gulp.run('js');
    gulp.run('images');
    gulp.run('jade');

    /*gulp.src('assets/img/content/!**!/!*')
        .pipe(imageResize({
            width : 100,
            height : 100,
            crop : true,
            upscale : false
        }))
        .pipe(gulp.dest('./public/css/img/content'));*/

    // Подключаем Livereload

    gulp.watch(['assets/styles/**/*.less', 'assets/styles/**/*.css'], function() {
        gulp.run('less');
    });
    gulp.watch(['assets/template/*/*.jade', 'assets/template/*.jade'], function() {
        gulp.run('jade');
    });
    gulp.watch('assets/img/**/*', function() {
        gulp.run('images');
    });
    gulp.watch('assets/js/**/*', function() {
        gulp.run('js');
    });
    
    gulp.run('connect');
});

gulp.task('build', function() {
    // css
    gulp.src(['./assets/styles/*.css', './assets/styles/*.less'])
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(csso()) // минимизируем css
        .pipe(gulp.dest('./build/css/')); // записываем css

    // fonts
    gulp.src(['./assets/fonts/**/*'])
        .pipe(gulp.dest('./build/fonts/')); // записываем fonts

    // jade
    gulp.src(['./assets/template/*.jade', '!./assets/template/_*.jade'])
        .pipe(jade())
        .pipe(gulp.dest('./build/'))

    // js
    gulp.src(['./assets/js/vendor/**/*.js'])
        .pipe(gulp.dest('./build/js'));
    // js
    gulp.src(['./assets/js/jquery*.js', './assets/js/bootstrap*.js', './assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));

    // image
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/css/img'))

});