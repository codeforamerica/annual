module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false,
        },
        files: {
          'public/css/application.css': 'dev/scss/application.scss'
        }
      },
      dev: {
        options: {
          sourceMap: true,
        },
        files: {
          'public/css/application.css': 'dev/scss/application.scss'
        }
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: ['dev/scss/*.scss','dev/scss/**/*.scss'],
        tasks: ['sass:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dist', ['sass:dist']);
  grunt.registerTask('dev', ['sass:dev', 'watch']);
  grunt.registerTask('default', ['dev']);
}
