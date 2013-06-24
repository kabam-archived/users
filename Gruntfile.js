module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
      'app.js',
      'Gruntfile.js',
      'lib/**/*.js',
      'config/**/*.js',
      'controllers/**/*.js',
      'models/**/*.js',
      'test/**/*.js'
      ]
    },

    mochacli: {
     options: {
      require: ['should'],
      reporter: 'spec',
      bail: true,
      recursive: true,
      timeout: '15s'
    },
    all: ['test/*.js']
  },

  jsdoc: {
    dist: {
      src: [
      'app.js',
      'lib/**/*.js',
      'config/**/*.js',
      'controllers/**/*.js',
      'models/**/*.js',
      'test/**/*.js',
      'README.md'
      ],
      options: {
        destination: 'client/app/docs',
        configure: 'config/jsdoc.json'
      }
    }
  }

});

	// Load the plugin that provides the 'grunt-mocha-cli' task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('default', ['mochacli', 'jshint', 'jsdoc']);
};
