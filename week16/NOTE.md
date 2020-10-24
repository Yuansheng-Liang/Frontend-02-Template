# 学习笔记
## 第一次课：安装并第一次启用yeoman
1. 在文件夹根目录初始化npm,运行命令: ```npm init ```
2. 全局安装yeoman，第一次安装时运行命令: ```npm i -g yo```  
    第二次时可能可以使用：```npm install yeoman-generator```
3. 按照特定目录结构设置文件夹：
    ```
    ├───package.json
    └───generators/
        ├───app/
        │   └───index.js
        └───router/
            └───index.js 
    ```
4. 更改package.json文件内容：   
    ```
    "name": "generator-XXX", 
    --------------------------
    "main": "generators/app/index.js",
    ```    
5. 设置index.js的内容：
    ```
    var Generator = require('yeoman-generator');

    module.exports = class extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts)

    }
    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }
    };
    ```
6. 在generator的文件根目录(含packag.json文件)运行：`npm link`
7. 启用yeoman时，在文件根目录(含packag.json文件)运行：`yo XXX   //XXX为名字`
## 第二次课：互动输入，文件系统，JSON文件和npm安装    
### 一，互动输入
1. 使用`this.prompt`接收信息，如：
    ```
    async prompting() {
        const answers = await this.prompt([
        {
            type: "input",
            name: "name",
            message: "Your project name",
            default: this.appname // Default to current folder name
        },
        {
            type: "confirm",
            name: "cool",
            message: "Would you like to enable the Cool feature?"
        }
        ]);

        this.log("app name", answers.name);
        this.log("cool feature", answers.cool);`
    }
    ```
2. 一般使用`async await` 的异步形式进行应答
3. `this.prompt` 中传入数组，数组中的每个成员都是一个对象，每个对象都是一个应答
4. 调用应答结果的方式为：`变量.名字` 在这里为`answers.name, answers.cool`
5. 使用 `type` 属性来定义应答的类型，`type: "input"` 为输入型，`type: "confirm"` 为是bool判断型
6.  `type: "input"` 输入型应答可以设置默认值 `default: XXX`

### 二，文件系统

1. 在`'./generators/app'`目录下创建文件夹templates，`'./generators/app/tempaltes'`。
2. 在`'./generators/app/tempaltes'`文件夹里创建模板文件：index.html
3. 在 html 中写入代码模板：
    ```
    <html>
        <head>
            <title><%= title %></title>
        </head>
    </html>
    ```
    -  `<%= title %>`的位置会被title的值代替。
4. 在方法中输入代码：
    ```
    this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('public/index.html'),
        { title: 'Templating with Yeoman' }
    );
    ```
    - `this.fs.copyTpl()` 方法能够复制模板示例。
    - `this.templetePath()` 方法传入字符串，表示要被复制的模板示例来自templates目录下的字符串同名路径文件。
    - `this.destinationPath()` 方法传入字符串，表示模板将要被复制到目标目录下的字符串的同名文件或者文件的相对路径。具体目标目录为`yo XXX` 命令的执行目录(一般不在本工具目录内)
    - 用对象形式保存变量，每个变量都是一个对象属性，通过对象的形式给模板中的变量赋值，如：`{ title: 'Templating with Yeoman' }`
5. 在终端中切换目录到目标目录，后调用命令行： `yo XXX`

### 三，JSON文件和npm安装

1. 定义一个对象
2. 调用`this.destinationPath()` 传入参数为字符串，表示目标文件目录下的文件或者文件的相对目录，
3. `this.fs.extendJSON()` 第一个参数为`this.destinationPath()`， 第二个参数为刚才定义的对象。
    - 运行后会发现该文件的内容变成了传入的对象转化成的JSON字符串，如果目标文件不存在则会创建一个同名文件
4. 调用 `yo XXX` 命令
5. 同理，`package.json` 也是一个JSON字符串，所以也可以通过以上方法设置`package.json`
6. `this.npmInstall()` 方法可以安装npm

```
class extends Generator {
  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  install() {
    this.npmInstall();
  }
};
```
## 第三节课 yeoman实际应用

### 应用方式：
1. 通过yeoman配置package.json
2. 通过yeoman复制文件
3. 通过yeman安装npm包

### 问题：
- 代码调用webpack时出现错误：
    ```
    F:\极客大学前端训练营\Frontend-02-Template\week16\vueeeeee>webpack
    F:\极客大学前端训练营\Frontend-02-Template\week16\vueeeeee\node_modules\webpack\lib\NormalModule.js:171
                            throw new TypeError(
                            ^

    TypeError: The 'compilation' argument must be an instance of Compilation
        at Function.getCompilationHooks (F:\极客大学前端训练营\Frontend-02-Template\week16\vueeeeee\node_modules\webpack\lib\NormalModule.js:171:10)
        at F:\极客大学前端训练营\Frontend-02-Template\week16\vueeeeee\node_modules\vue-loader\lib\plugin-webpack5.js:30:70
        at SyncHook.eval [as call] (eval at create (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:19:10), <anonymous>:5:1)
        at SyncHook.lazyCompileHook (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\node_modules\tapable\lib\Hook.js:154:20)
        at Compiler.newCompilation (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\lib\Compiler.js:631:26)
        at C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\lib\Compiler.js:667:29
        at AsyncSeriesHook.eval [as callAsync] (eval at create (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:4:1)
        at AsyncSeriesHook.lazyCompileHook (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\node_modules\tapable\lib\Hook.js:154:20)
        at Compiler.compile (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\lib\Compiler.js:662:28)
        at C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\lib\Compiler.js:321:11
        at Compiler.readRecords (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\lib\Compiler.js:529:11)
        at C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\lib\Compiler.js:318:10
        at AsyncSeriesHook.eval [as callAsync] (eval at create (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:4:1)
        at AsyncSeriesHook.lazyCompileHook (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\node_modules\tapable\lib\Hook.js:154:20)
        at C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\lib\Compiler.js:315:19
        at AsyncSeriesHook.eval [as callAsync] (eval at create (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\node_modules\tapable\lib\HookCodeFactory.js:33:10), <anonymous>:13:1)
        at AsyncSeriesHook.lazyCompileHook (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\node_modules\tapable\lib\Hook.js:154:20)
        at Compiler.run (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack\lib\Compiler.js:312:24)
        at processOptions (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack-cli\bin\cli.js:353:14)
        at C:\Users\14698\AppData\Roaming\npm\node_modules\webpack-cli\bin\cli.js:364:3
        at Object.parse (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack-cli\node_modules\yargs\yargs.js:576:18)
        at C:\Users\14698\AppData\Roaming\npm\node_modules\webpack-cli\bin\cli.js:49:8
        at Object.<anonymous> (C:\Users\14698\AppData\Roaming\npm\node_modules\webpack-cli\bin\cli.js:366:3)
    ```
    * 这个问题出现在webpack的过程中，由于不懂webpack源码，找不到问题的根源

## 第四节课 webpack基本知识
1. webpack最初设计是将node代码打包成浏览器可用代码
2. webpack用于多文件合并
3. webpack最终输出js文件，然后html需要手工引用
4. webpack可以通过设置loader和plugin来控制合并的规则和文本转换
5. 安装时需要两个包"webpack","webpack-cli"
6. 本地安装"webpack-cli"后可以通过`npx webpack` 执行webpack命令
7. webpack可以多入口（entry）打包，但一次执行只打包一个文件及其依赖
8. output配置输出地址和文件命
9. loader实际上进行了文本转换，然后被webpack通过import和require调用
10. test 属性决定了什么后缀名的文件调用什么样的loader

## 第五节课 babel基本知识
1. babel是一个独立于webpack的系统
2. babel用于将新版本的js转换成老版本的js
3. 在终端中安装babel通过 `npm install @babel/core @babel/cli` 命令
4. 通过 `babel 文件路径 > 输出的文件名` 将文件输出（可以指定拓展名）
5. babel配置文件名`.babelrc`，用JSON的形式配置
6. 简单配置举例：
    ```
    {
        "presets": ["@babel/preset-env"]
    }
    ```
7. 安装babel配置文件可通过 `npm install @babel/preset-env`
8. babel经常通过webpack来作为loader使用
