module.exports = function(grunt) {	

	grunt.initConfig({
		jshint: {
			all: [
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
		}
	});

	// Load the plugin that provides the 'grunt-mocha-cli' task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-cli');

	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('test', ['mochacli']);
};