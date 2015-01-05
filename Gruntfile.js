module.exports = function(grunt) {
  grunt.initConfig({
    react: {
      options: {
        harmony: true
      },
      src: {
        files: [
          {
            expand: true,
            cwd: './src/',
            src: ['**/*.jsx', 'utils/**/*.js', 'index.js'],
            dest: './build/',
            ext: '.js'
          },
        ],
      },
      test: {
        files: [
          {
            expand: true,
            cwd: './specs/',
            src: ['**/*.jsx'],
            dest: './test-built/',
            ext: '.js'
          },
        ],
      }
    },
    browserify: {
      src: {
        files: {
          'build/React-Expandable-Nav.js': ['./build/React-Expandable-Nav.js']
        },
        browserifyOptions: {
          standalone: true
        }
      },
      test: {
        files: {
          'test_bundle.js': ['./test-built/**/*.js']
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    jshint: {
      all: {
        options: {
          jshintrc: './.jshintrc'
        },
        src: [
          './src/**/*.jsx',
          './example/**/*.jsx'
        ],
        exclude: [
          './example/vendor/**'
        ]
      }
    },
    watch: {
      all: {
        files: [
          'scripts/components/**/*.jsx',
          'specs/**/*.jsx'
        ],
        tasks: ['test'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsxhint');

  grunt.registerTask('build', ['jshint:all', 'react:src', 'react:test', 'browserify:test', 'karma', 'browserify:src']);
  grunt.registerTask('test', ['react:src', 'react:test', 'browserify:test', 'karma']);
};
