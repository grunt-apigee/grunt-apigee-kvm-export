# grunt-apigee-kvm-export

> Exports Apigee Edge KVM entries to a directory.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-apigee-kvm-export --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-apigee-kvm-export');
```

## The "apigee_kvm_export" task

### Overview
In your project's Gruntfile, add a section named `apigee_kvm_export` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  apigee_kvm_export: {
    "testmyapi" : { //target specific options go here, in this example first target is testmyapi. This will be replaced with your org in Apigee Edge
      options: {
        type: "org",
        dest: 'config/kvm/testmyapi',
        match: /^(passwords|targets)$/ //  exports all KVMs by default or /(.*?)$/ when match is missing
      }
    },
    "testmyapi-prod" : { //target specific options go here, in this example first target is testmyapi environment and prod org.
      options: {
        type: "env",
        dest: 'config/kvm/testmyapi/testmyapi-prod',
        match: /^(passwords|targets)$/ //  exports all KVMs by default or /(.*?)$/ when match is missing
      }
    }
  }
});
```

### Options

#### options.type
Type: `String`
Default value: `'env'`

A string value that is used to do retrieve KVM at specific scope. Valid values environment and organization.

#### options.dest
Type: `String`
Default value: `'./'`

A string value that is used to specify where to save KVM files. Will use root folder in absence of this option.

#### options.match
Type: `RegEx`
Default value: `/(.*?)$/`

A RegEx value that is used to specify which KVM names will be exported. By default, all KVMs are exported. Specify multiple KVM entries with vertical bars. /^(passwords|targets)$/

### Usage Examples

#### Default Options
In this example, two targets are declared testmyapi and testmyapi-prod. Each target has defined options as per above directions.

```js
grunt.initConfig({
  apigee_kvm_export: {
    "testmyapi" : { //target specific options go here, in this example first target is testmyapi. This will be replaced with your org in Apigee Edge
      options: {
        type: "org",
        dest: 'config/kvm/testmyapi',
        match: /^(passwords|targets)$/ //  exports all KVMs by default or /(.*?)$/ when match is missing
      }
    },
    "testmyapi-prod" : { //target specific options go here, in this example first target is testmyapi environment and prod org.
      options: {
        type: "env",
        dest: 'config/kvm/testmyapi/testmyapi-prod',
        match: /^(passwords|targets)$/ //  exports all KVMs by default or /(.*?)$/ when match is missing
      }
    }
  },
});
```

#### Incorporating this plugin to Apigee Grunt Scripts
Each target is designed to be executed based on the flags passed by users. Therefore, it is highly recommended to select targets leveraging these flags. For instance, the following command explains how to switch from one organization and organization to another one.

```js
grunt.registerTask('apigee_kvm_export_full',
  ['apigee_kvm_export:' + grunt.config.get("apigee_profiles")[grunt.option('env')].org,
  'apigee_kvm_export:' + grunt.config.get("apigee_profiles")[grunt.option('env')].org + '-' + grunt.option('env')
  ]);
```
which can be executed with grunt-cli as:

```bash
grunt apigee_kvm_export_full --env=test --username=$ae_username --password=$ae_password --stack --curl
```
__Note: apigee-config.js contains the definition of the Apigee-Edge profiles. These profiles are required to be loaded within grunt.initConfig. For a full example please see this plugin Gruntfile.js file__
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
