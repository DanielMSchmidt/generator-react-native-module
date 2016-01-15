'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('react-native module') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your component?',
      required: true
    }];

    this.prompt(prompts, function (props) {
      this.name = capitalize(_.camelCase(props.name));
      this.moduleName = 'react-native-' + _.kebabCase(this.name);

      done();
    }.bind(this));
  },

  // TODO: refactor
  writing: function () {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
    this.fs.write(this.destinationPath('README.md'), readmeTpl({name: this.name, moduleName: this.moduleName}));

    var packageTpl = _.template(this.fs.read(this.templatePath('package.json')));
    this.fs.write(this.destinationPath('package.json'), packageTpl({name: this.name, moduleName: this.moduleName}));

    var indexTpl = _.template(this.fs.read(this.templatePath('index.js')));
    this.fs.write(this.destinationPath('src/index.js'), indexTpl({name: this.name, moduleName: this.moduleName}));
  },

  install: function () {
    this.npmInstall();
  }
});
