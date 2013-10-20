'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      test: {
        port: 8000,
        middleware: function(connect) {
          return [
            mountFolder(connect, 'app')
          ];
        }
      }
    },

    watch: {
      files: ['test/spec/**/*.js', 'src/**/*.coffee', 'test/SpecRunner.js'],
      tasks: ['exec', 'coffee']
    },

    coffee: {
      compile: {
        files: {
          'bin/responsive_handler.js': 'src/responsive_handler.coffee',
          'bin/ngresponsive.js': 'src/ngresponsive.coffee'
        }
      }
    },

    uglify: {
      responderjs: {
        files: {
          'responder.min.js': ['bin/responsive_handler.js'],
          'ng-responsive.min.js': ['bin/responsive_handler.js', 'bin/ngresponsive.js']
        }
      }
    },

    exec: {
      jasmine: {
        command: 'phantomjs test/lib/run-jasmine.js http://localhost:8000/jasmine.html',
        stdout: true
      }
    }
  });

  
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['connect:test', 'exec', 'watch']);

}
