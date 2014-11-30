module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        availabletasks: {
            tasks: {}
        },

        jshint: {
            all: {
                src: ['Grunfile.js', 'karma.conf.js', 'src/**/*.js', 'test/**/*.js']
            }
        },

        copy: {
            hooks: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'git_hooks/',
                        src: '*',
                        dest: '.git/hooks/'
                    }
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },

            server: {
                options: {
                    base: __dirname,
                    livereload: true
                }
            }
        },

        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },

        bower: {
            install: {
                options: {
                    copy: false,
                    verbose: true
                }
            }
        },

        karma: {
            continuous: {
                configFile: 'karma.conf.js',
                autoWatch: true,
                singleRun: false
            },
            once: {
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin'
            }
        },

        publish: {
            main: {
                src: ['./']
            }
        }

    });

    grunt.registerTask('default', ['availabletasks:tasks']);
    grunt.registerTask('install', ['bower:install', 'copy:hooks']);
    grunt.registerTask('run', ['jshint', 'karma:continuous']);
    grunt.registerTask('release', ['jshint', 'karma:once', 'bump:patch', 'publish']);
    grunt.registerTask('test', ['jshint', 'karma:once']);

};