var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

  }
  async method1() {
    const giao = await this.prompt([
      {
        type: "input",
        name: "inputgiao",
        message: "input a giao",
        default: this.giaoinput
      }, 
      {
        type: "confirm",
        name: "isgiao",
        message: "giao?"
      }
    ]);
    this.log(giao.inputgiao, giao.isgiao) 
  }
  
  //   this.log("inputgiao", giao.inputgiao);
  //   this.log("giao?", giao.isgiao);
  // }

  //  giaoFile() {
  //   this.fs.copyTpl(
  //     this.templatePath("t.html"),
  //     this.destinationPath("public/index.html"),
  //     {giao: 'gioagiaogiaogiaogiaogiao!!!!!!!!!'}
  //   );

  //   // this.fs.copyTpl(
  //   //   this.templatePath('index.html'),
  //   //   this.destinationPath('public/index.html'),
  //   //   { title: 'Templating with Yeoman' }
  //   // );
  // }

  // method2() {
  //   this.log('method 2 just ran');
  // }

  initGiao() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '16.2.0'
      }
    }
    const giaoJson = {
      gioa: {
        gioa: 'giao'
      }
    }
    this.fs.extendJSON(this.destinationPath('giao.js'), giaoJson);
    // this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    this.npmInstall();
  }
};