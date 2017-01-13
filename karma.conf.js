// Karma configuration

var babel = require('rollup-plugin-babel');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

module.exports = function (config) {
	var opts = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
		files: [
			'src/index.js',
			'test/index.js',
			'src/sw.js'
		],

    // Proxies
		proxies: {
			'/edgemesh.sw.js': '/base/src/sw.js'
		},

    // list of files to exclude
		exclude: [
			'/node_modules/',
			'/test/'
		],

    // Client options
		client: {
			captureConsole: false
		},

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'src/index.js': ['rollup'],
			'test/index.js': ['rollup']
		},

    // Rollup
		rollupPreprocessor: {
			plugins: [
				resolve({
					jsnext: true,
					main: true,
					preferBuiltins: true,
					browser: true
				}),
				commonjs({
					include: 'node_modules/**'
				}),
				babel({
					babelrc: false,
					presets: ['es2015-rollup'],
					plugins: [
						'transform-object-rest-spread',
						'transform-class-properties',
						'transform-export-extensions',
            ['__coverage__', {ignore: ['test', 'node_modules']}]
					]
				})
			],
			format: 'iife',
			moduleName: 'Edgemesh'
		},

    // Coverage
		coverageReporter: {
			dir: 'coverage',
			reporters: [
            {type: 'lcovonly', subdir: '.', file: 'lcov.info'}
			]
		},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['mocha', 'coverage'],

    // web server port
		port: 9876,

    // enable / disable colors in the output (reporters and logs)
		colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome', 'ChromeCanary'],

    // Custom launchers
    // for travis ci
		customLaunchers: {
			ChromeTravisCi: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		},

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
		concurrency: Infinity

	};

  // Detect Travis
	if (process.env.TRAVIS) {
		opts.browsers = ['ChromeTravisCi'];
	}

  // Set options
	config.set(opts);
};
