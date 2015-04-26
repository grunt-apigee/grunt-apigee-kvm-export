/*
 * grunt-apigee-kvm-export
 * https://github.com/grunt-apigee/grunt-apigee-kvm-export
 *
 * Copyright (c) 2015 dzuluaga
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var apigee_conf = require('./grunt/apigee-config.js');
  // Project configuration.
  grunt.initConfig({
    apigee_profiles : apigee_conf.profiles(grunt),
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    apigee_kvm_export: {
        "testmyapi" : {
          options: {
            type: "org",
            dest: 'config/kvm/testmyapi'
          }
        },
        "testmyapi-prod" : {
          options: {
            type: "env",
            dest: 'config/kvm/testmyapi/testmyapi-prod'
          }
        },
        "testmyapi-test" : {
          options: {
            type: "env",
            dest: 'config/kvm/testmyapi/testmyapi-test'
          }
        }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'apigee_kvm_export', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('apigee_kvm_export_full',
    ['apigee_kvm_export:' + grunt.config.get("apigee_profiles")[grunt.option('env')].org,
    'apigee_kvm_export:' + grunt.config.get("apigee_profiles")[grunt.option('env')].org + '-' + grunt.option('env')
    ]);

};
