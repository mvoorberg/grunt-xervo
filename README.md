# grunt-xervo

> Allows deployment to Xervo.io from Grunt.

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

## The "xervo-deploy" task

### Overview

In your project's Gruntfile, add a section named `xervo-deploy` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
  "xervo-deploy": {
    options: {
      // Task-specific options go here.
    project: "my_xervo_project"
    }
  },
});
```

### Options

#### options.project

Type: `String`

The name of the Xervo.io project to deploy.

### Usage Examples

#### Default Options

In this example, a target `stage` is defined. When the task runs, it attempts to deploy the site to the Xervo project named `my-site-stage`

```javascript
grunt.initConfig({
  "xervo-deploy": {
    stage: {
      options: {
          project: "my-site-stage"
      }
    },
  },
});
```
