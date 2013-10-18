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
      files: ['test/spec/**/*.js', 'src/**/*.js', 'test/SpecRunner.js'],
      tasks: 'exec'
    },

    coffee: {
      compile: {
        files: {
          'bin/responsive_handler.js': 'src/responsive_handler.coffee'
        }
      }
    },

    exec: {
      jasmine: {
        command: 'phantomjs test/lib/run-jasmine.js http://localhost:8000/test',
        stdout: true
      }
    }
  });

  
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect:test', 'exec', 'watch']);

}
