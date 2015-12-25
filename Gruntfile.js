/*global module:false*/
module.exports = function (grunt) {
  'use strict';

  var config = {
    src: 'src',
    test: 'test'
  };

  // 有了这个可以不用写一堆的 grunt.loadNpmTasks('xxx') ，
  // 再多的任务只需要写一个 require('load-grunt-tasks')(grunt)
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    config: config,
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= config.src %>/js/*.js'],
        dest: 'dist/lib/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/lib/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    bower: {
      install: {
        options: {
          targetDir: '<%=config.src %>/js/lib',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: false
        }
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8000,
          base: ['src/'],
          keepalive: true,
          open: 'http://localhost:8000'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

  grunt.registerTask('serve', 'Compile then start a connect web server', function () {
    // log输出测试
    grunt.log.writeln('Logging some stuff...').ok();
  });

  grunt.registerTask('server', ['connect']);

};
