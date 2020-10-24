var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    async get() {
        const input = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Input your project name',
                default: this.appname
            }
        ]);

        let pkgJSON = {
            "name": input.name,
            "version": "1.0.0",
            "description": "",
            "main": "generators/app/index.js",
            "scripts": {
              "test": "echo \"Error: no test specified\" && exit 1"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
            },
            "dependencies": {
            }
        }
        this.fs.extendJSON(this.destinationPath("package.json"), pkgJSON);

    
        this.npmInstall(["vue"], {"save-dev": false});
        this.npmInstall(["webpack", "vue-loader", "vue-style-loader", "css-loader",
                "vue-template-compiler", "copy-webpack-plugin"], {"save-dev": true});
    
    
        this.fs.copyTpl(
            this.templatePath("HelloWorld.vue"),
            this.destinationPath("./src/HelloWorld.vue"),
        );
        this.fs.copyTpl(
            this.templatePath("webpack.config.js"),
            this.destinationPath("webpack.config.js"),
        );
        this.fs.copyTpl(
            this.templatePath("main.js"),
            this.destinationPath("./src/main.js"),
        );
        this.fs.copyTpl(
            this.templatePath("index.html"),
            this.destinationPath("./src/index.html"),
            {title: input.name}
        )
    }
}