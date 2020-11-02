# 学习笔记
## 第一节课：安装并使用Mocha
1. 新建文件夹，并初始化npm `npm init`
2. 
安装Mocha ` npm install -g mocha`
3. 新建js文件（用于被测试），并定义函数，并在文件中使用 `module.exports`
4. 新建测试文件夹，并在内新建js文件（用以控制测试）
5. 控制测试的js文件内
   - 引用 ` var assert = require("assert")`
   - 再通过`require`引用被测试的js文件
   - 用 ```describe("测试集的名称"， function() {})```，来整理需要测试的项目
     - 在`describe`的`function`中可以再次嵌套`describe`来使要被测试的项目更有组织
     - 在最后一层的`escribe`的`function`中调用`it("被测试的内容", function(){})`来启动 测试
     - 在`it`的`function`中调用`assert.equal(expression, value)`来测试`expression`的值和`value`是否相等
6. 最后，在终端命令中调用`mocha`来观察测试结果

## 第二节课： 使用babel来使Mocha能使用最新的js语法

1. 安装@babel/core @babel/register @babel/preset-env `npm install --save-dev @babel/core @babel/register @babel/preset-env`

2. 在含有 `package.json ` 文件的目录下创建 `.babelrc `  文件并配置json格式的设置：

   ```json
   {
       "presets": ["@babel/preset-env"]
   }
   ```

3. 此时可以直接调用`./node_modules/.bin/mocha --require @babel/register` ，在全局调用mocha时会报错`Moudle Not Found`，所以此时应该调用local的mocha。 此时就可以编译成功了，但为了简便可以进行以下设置

   1. 在package.json中的"scripts"中的”test“设置：

   ```json
       
           "test": "mocha --require @babel/register"
       
   ```

   2. 在命令行中直接调用`npm run test`

## 第三节课：使用nyc来测试覆盖率

* nyc快速安装使用

  1. 安装nyc: `npm install --save-dev nyc` 
  2. 调用local的nyc来执行mocha：`./node_modules/.bin/nyc mocha`

* 简便配置

  1. 在package.json中设置：

     ```json
     "scripts": {
         "test": "mocha --require @babel/register"		//原有
         "coverage": "nyc mocha"		//新增
     }
     ```

  2. 在命令行中调用：`npm run coverage`

* 为兼容babel，需要在babel和nyc的配置文件内都进行设置

  * [npm参考资料](https://www.npmjs.com/package/@istanbuljs/nyc-config-babel "@istanbuljs/nyc-config-babel")

  1. 安装babel-plugin-istanbul和@istanbul/nyc-config-babel两个包：`npm i babel-plugin-istanbul @istanbuljs/nyc-config-babel --save-dev`

  2. 在.babelrc文件中设置：

     ```json
     {
         "presets": ["@babel/env", "..., etc."],
         "plugins": ["istanbul"]
     }
     ```

  3. 在.nycrc文件中设置：

     ```json
     {
         "extends": "@istanbuljs/nyc-config-babel"
     }
     ```

  4. 接下来就能正常调用命令行执行带有更高版本语法的test.js了



## 第四节课：提高覆盖率并在vsCode中进行调试

* 不断进行测试，以保证行覆盖率（line）足够高

  * 找到没被覆盖到的行，并添加测试用例以进行覆盖

* 使用`vscode`进行调试

  * 因为要调试`mocha`测试而不是某个js文件，所以需要对`lunch.js`文件进行配置

    * ```json
      "program": "${workspaceFolder}/node_modules/mocha/bin/mocha"	
      
      "program": "${workspaceFolder}/node_modules/.bin/mocha"
      //在两者中选一个，后者可能只适用于老板本的mocha
      ```

    * ```json
      "args": [	]		//配置mocha的参数
      ```

  * 因为在运行中调用了“register”，所以`lunch.js`要配置node的参数

    * ```json
      "runtimeArgs": [ "--require", "@babel/register" ]
      ```

  * 因为调用了“babel”，所以代码被翻译之后行数变得不对应，为了方便打断点需要进行配置

    * 在lunch.js 中`"sourceMaps": true`
    * 在.babelrc中`"sourceMaps": inline`













