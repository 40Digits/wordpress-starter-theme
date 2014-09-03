module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    project: {
      app: 'app',
      dir: '',
      sass: 'sass',
      compile: 'sass-compile'
    },

    // Start watching SASS
    sass: {
      dev: {
        options: {
          style: 'expanded',
          lineNumbers: true,
          sourcemap: false,
          compass: false
        },
        files: [{
          expand: true,
          cwd: '<%= project.sass %>',
          src: ['*.{scss,sass}'],
          dest: '<%= project.compile %>/raw/',
          ext: '.css'
        }]
      }
    },

    // Add in prefixes where necessary
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      // prefix all files
      multiple_files: {
        expand: true,
        flatten: true,
        src: '<%= project.compile %>/raw/*.css',
        dest: '<%= project.compile %>/prefix/'
      },
    },

    // Combine Media Queries
    cmq: {
      your_target: {
        files: {
          '<%= project.dir %>': ['<%= project.compile %>/prefix/*.css']
        }
      }
    },

    // Set up watch commands for library
    watch: {
      sass: {
        files: '**/*.scss',
        tasks: ['sass:dev']
      },
      prefix: {
        files: '<%= project.compile %>/raw/*.css',
        tasks: ['autoprefixer']
      },
      combinemedia: {
        files: '<%= project.compile %>/prefix/*.css',
        tasks: ['cmq']
      }
    }
  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['watch']);
}