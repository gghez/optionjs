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
                tagName: '%VERSION%',
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
    grunt.registerTask('test', ['jshint', 'karma:once']);
    grunt.registerTask('prepush', ['test']);
    grunt.registerTask('run', ['jshint', 'karma:continuous']);
    // Keep test (even if pre-push hook also test) to avoid bump create tag if failed.
    grunt.registerTask('release', ['test', 'bump:patch', 'publish']);

};
