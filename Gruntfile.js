// Generated on 2014-02-03 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var fs = require('fs');

  var views = grunt.file.readJSON('views/views.json');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: 'app',
      dist: 'dist',
      tmp: '.tmp'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/**/{,*/}*.js', '<%= yeoman.app %>/**/{,*/}*.html'],
        tasks: ['build']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    'gh-pages': {
      options: {
        base: 'docs'
      },
      src: ['**']
    },

    less: {
      dist: {
        options: {
          compress: true
        },
        files: {
          'dist/css/pattern-library.css':'less/pattern-library.less',
          'dist/css/pattern-library-docs.css':'less/pattern-library-docs.less'
         }
      },
      docs: {
        options: {
          compress: false
        },
        files: {
          'docs/css/pattern-library.css':'less/pattern-library.less',
          'docs/css/pattern-library-docs.css':'less/pattern-library-docs.less'
        }
      }
    },


    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    concat: {
      dist: {
        src: ['<%= yeoman.app %>/scripts/**/{,*/}*.js', 'js/**/{,*/}*.js'],
        dest: '<%= yeoman.dist %>/js/pattern-library.js',
      },
      docs: {
        src: ['<%= yeoman.app %>/scripts/**/{,*/}*.js', 'js/**/{,*/}*.js'],
        dest: 'docs/js/pattern-library.js'
      },
      html: {
        files: (function() {
          var copyList = [];

          Object.keys(views).forEach(function(key) {
            copyList.push({
              src: views[key],
              dest: 'docs/' + key + '.html'
            });
          });

          return copyList;
        })()
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        src: '<%= yeoman.dist %>/js/pattern-library.js',
        dest: '<%= yeoman.dist %>/js/pattern-library.min.js'
      },
      docs: {
        src: 'docs/js/pattern-library.js',
        dest: 'docs/js/pattern-library.min.js'
      }
    },

//    // Renames files for browser caching purposes
//    rev: {
//      dist: {
//        files: {
//          src: [
//            '<%= yeoman.dist %>/scripts/bestfit/{,*/}*.js',
//            '<%= yeoman.dist %>/stylesheets/{,*/}*.css'
//          ]
//        }
//      }
//    },

//    // Allow the use of non-minsafe AngularJS files. Automatically makes it
//    // minsafe compatible so Uglify does not destroy the ng references
//    ngmin: {
//      tmp: {
//        files: [{
//          expand: true,
//          cwd: '<%= yeoman.tmp %>/concat/scripts/',
//          src: ['scripts.js'],
//          dest: '<%= yeoman.tmp %>/concat/scripts/'
//        }]
//      },
//      dist: {
//        files: [{
//          expand: true,
//          cwd: '<%= yeoman.dist %>/scripts/bestfit',
//          src: ['scripts.js'],
//          dest: '<%= yeoman.dist %>/scripts/bestfit'
//        }]
//      }
//    },

    ngtemplates: {
      BestFitApp: {
        cwd: '<%= yeoman.app %>',
        src: ['template/**/*.html', '!template/bootstrap/**/*.html', 'views/**/*.html'],
        dest: '<%= yeoman.tmp %>/templates.js',
        options: {
          usemin: '/scripts/bestfit/scripts.js', // this comes from BestFitLeads.ascx
          htmlmin: {
            collapseWhitespace:             true,
            removeComments:                 true // Only if you don't use comment directives!
          }
        }
      },
      'ui.bootstrap': {
        cwd: '<%= yeoman.app %>/template/bootstrap',
        src: ['**/*.html'],
        dest: '<%= yeoman.tmp %>/templatesBootstrap.js',
        options: {
          usemin: '/scripts/bestfit/modules.js', // this comes from BestFitLeads.ascx
          url: function(url) {
            return 'template/' + url;
          }
        }
      }
    },

    connect: {
      docs: {
        options: {
          hostname: 'localhost',
          port: 9000,
          open: true,
          base: 'docs',
          keepalive: true
        }
      }
    },


    copy: {
      // copy index.html and images directory into two locations
       dist: {
        files: [
          {src: ['<%= yeoman.app %>/index.html'], dest: '<%= yeoman.dist %>/'},
          {src: ['images/**'], dest: '<%= yeoman.dist %>/'}
        ]
       },
      docs: {
        files: [
          {
            src: ['index.html'],
            dest: 'docs/'
          },
          {
            src: ['images/**'],
            dest: 'docs/'
          }
        ]
      }
    }

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   lms: {
    //     files: {
    //       '<%= yeoman.lms %>/stylesheets/master.css': [
    //         '<%= yeoman.lms %>/stylesheets/master.css'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

  });

  grunt.registerTask('build', [
//    'clean:dist',
//    'useminPrepare',
    'ngtemplates',
    'concat',
    'ngmin:tmp',
    //'styles',
    'cssmin',
    'copy:dist',
    'uglify',
    'rev',
    'usemin',
    'staticHost',
    'clean:lms',
    'copy:lms'
  ]);

  grunt.registerTask('build:debug', [
    'clean:dist',
    'useminPrepare',
    'ngtemplates',
    'concat',
    'ngmin:tmp',
    'styles',
    'cssmin',
    'copy:dist',
    'rev',
    'usemin',
    'clean:lms',
    'copy:lms'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

  grunt.registerTask('styles', ['less']);

  grunt.registerTask('css', ['less:dist','less:docs']); // Just output the CSS
  grunt.registerTask('server', [
  'concat:docs', 'concat:html', 'uglify:docs', 'less:docs', 'copy:docs', 'connect']); // Run server
  grunt.registerTask('default', [
    'concat:dist','concat:docs','uglify:dist','uglify:docs','less:dist',
    'less:docs','copy:dist','copy:docs']); // Full Monty

  grunt.registerTask('website', [
    'concat:docs', 'concat:html', 'uglify:docs', 'less:docs', 'copy:docs', 'gh-pages']);

  //grunt.registerTask('css', ['less:dist','less:docs']); // Just output the CSS
//  grunt.registerTask('server', [
//    'build',
//    'less:docs',
//    'connect'
//  ]);

//  grunt.registerTask('default', ['concat:dist','concat:docs','uglify:dist','uglify:docs','less:dist',
//    'less:docs','copy:dist','copy:docs']); // Full Monty
};
