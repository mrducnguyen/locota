// This shows a full config file!

module.exports = function(grunt) {
	var vendorList = [
		'jquery/dist/**',
		'bootstrap/dist/**',
		'bootstrap-datepicker/dist/**',
		'select2/dist/**',
		'select2-bootstrap-theme/dist/**',
		'flag-icon-css/css/**',
		'flag-icon-css/flags/**',
		'lodash/lodash*.js'
	];

	grunt.initConfig({
		watch: {
			css: {
				files: ['scss/**/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['scripts/**/*.js'],
				tasks: ['browserify']
			},
			templates: {
				files: ['views/**/*.hgn'],
				tasks: ['hogan']
			}
		},

		sass: {
			dev: {
				options: {
					sourcemap: 'auto',
					style: 'expanded'
				},
				files: {
					'html/css/main.css': 'scss/main.scss'
				}
			}
		},

		hogan: {
			templates: {
				src: 'views/**/*.hgn',
				dest: 'scripts/templates.js',
				options: {
					binderName: 'nodejs',
					exposeTemplates: true
				}
			}
		},

		browserify: {
			dev: {
				files: {
					'html/js/main.js': ['scripts/app.js']
				}
			}
		},

		clean: {
			init: ['html/vendor/**', 'html/css/**', 'html/js/**'],
			build: ['build/**'],
			dist: ['dist/**']
		},

		copy: {
			init: {
				files: [{
					expand: true,
					cwd: 'node_modules/',
					src: vendorList,
					dest: 'html/vendor'
				}]
			},
			build: {
				files: [{
					expand: true,
					cwd: 'node_modules/',
					src: vendorList,
					dest: 'build/vendor'
				}, {
					expand: true,
					cwd: 'html/',
					src: [
						'js/**/*.min.js',
						'css/**',
						'img/**'
					],
					dest: 'build'
				}, {
					src: 'html/index-release.html',
					dest: 'build/index.html'
				}]
			}
		},

		uglify: {
			build: {
				files: {
					'html/js/main.min.js': ['html/js/main.js']
				}
			}
		},

		compress: {
			dist: {
				options: {
					archive: 'dist/release.zip'
				},
				files: [{
					expand: true,
					cwd: 'build/',
					src: ['**/*'],
					dest: '/'
				}]
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'html/css/*.css',
						'html/js/*.js',
						'html/**/*.html'
					]
				},
				options: {
					browser: 'firefox',
					watchTask: true,
					directory: true,
					port: 4000,
					server: {
						baseDir: 'html'
					}
				}
			}
		}
	});

	// load npm tasks
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-hogan');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// define tasks
	grunt.registerTask('init', ['clean:init', 'copy:init', 'sass', 'browserify', 'hogan']);
	grunt.registerTask('build', ['sass', 'browserify', 'hogan', 'uglify:build', 'clean:build', 'copy:build']);
	grunt.registerTask('dist', ['clean:dist', 'build', 'compress:dist']);
	// define default task
	grunt.registerTask('default', ['browserSync', 'watch']);
};