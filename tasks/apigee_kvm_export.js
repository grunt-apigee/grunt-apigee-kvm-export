/*
 * grunt-apigee-kvm-export
 * https://github.com/grunt-apigee/grunt-apigee-kvm-export
 *
 * Copyright (c) 2015 dzuluaga
 * Licensed under the MIT license.
 */

'use strict';
var apigee = require('apigee-sdk-mgmt-api'),
    async = require('async'),
    _ = require('lodash');

module.exports = function(grunt) {
  grunt.registerMultiTask('apigee_kvm_export', 'Exports Apigee Edge KVM entries to a directory.', function() {
    var done = this.async();
    var options = this.options({
      type: 'env',
      dest: './',
      match: /(.*?)$/
    });
    grunt.log.writeln('Retrieving KVMs at environment level...');
    apigee.getKVMList(
      grunt.config.get("apigee_profiles")[grunt.option('env')],
      options.type,
      getKVMList.bind( { grunt: grunt, options: options, done: done } ),
      grunt.option('curl'));
  });
};

function getKVMList(err, response, body){
  if(!err){
    async.each(
      JSON.parse(body),
      saveKVM.bind({ grunt : this.grunt, options : this.options }),
      function(err){
        this.done(err);
      }.bind({ done : this.done }));
  }
}

function saveKVM(kvmName, cb){
  //if(!_.startsWith(kvmName,'__')){
    if(kvmName.match(this.options.match)){
      apigee.getKVM(
        this.grunt.config.get("apigee_profiles")[this.grunt.option('env')],
        kvmName,
        this.options.type,
        function(err, response, body) {
          this.grunt.log.writeln('writing KVM config file: ' + this.options.dest + '/' + kvmName + '.json');
          this.grunt.file.write(this.options.dest + '/' + kvmName + '.json', body);
          cb(err);
        }.bind( { grunt : this.grunt, options : this.options } ),
        this.grunt.option('curl'));
  }else{
    this.grunt.log.debug('skipping KVM name: ' + kvmName);
    cb();
  }
}


