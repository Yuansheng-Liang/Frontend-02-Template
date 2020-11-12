# 学习笔记

## 第一节课：持续集成，发布前检查的相关知识 

### 传统持续集成 

1. daily build，全局build成本高
2. BVT，冒烟测试

### 前端持续集成

1. build时间可以缩短

2. 轻量级的检查方式：lint。用无头浏览器测试，生成Dom树

   

通过Git hook完成检查时机，用Eslint轻量级检查，用无头浏览器进行规则检查





## 第二节课：Git Hooks的基本用法

1. 新建文件夹

2. 创建 README.md文件

3. 执行`git init`

4. 目录".git"下有“hooks”文件夹，内部文件带有“.sample”后缀，为不执行文件，去掉后变为可执行文件

5. 新建“pre-commit”文件，表示是在commit之前执行的hook（有个同名sample：pre-commit.sample）

6. 在“pre-commit”文件中输入代码：

   ```javascript
   #!/usr/bin/env node		//表示用node执行脚本，“#!/usr/bin/env”一个标点符号都不能错
   
   const process = require("process");
   
   //process.exit(1);		//执行这行代码时，阻止commit行为
   ```

7. 在git中尝试commit，会发现无法commit，`git status`中也显示待commit



## 第三节课：ESLint的基本用法

1. 安装ESLint，`npm install eslint --save-dev`
2. 设置ESLint，`npx eslint --init`
3. 调用ESLint，`npx eslint yourfile.js`



## 补充知识点：

### 文件的访问权限：

#### 查看访问权限

在命令行中执行`ls -l`查看文件权限

#### 文件权限的内容

1. 文件权限分10位，从左数第一位表示文件的类型，往后三位表示文件所有者对它的权限，再往后三位表示文件所属组的权限，最后三位表示其他人的权限。
   1. 每三位表示权限的符号中，右边第一位表示执行权限（x），有这个权限，则这一位为"x"，没有则为"-"
   2. 每三位表示权限的符号中，右边第二位表示写权限（w），有这个权限，则这一位为"w"，没有则为"-"
   3. 每三位表示权限的符号中，右边第三位表示读权限（r），有这个权限，则这一位为"r"，没有则为"-"
2. 如，'-rw-r--r--'表示：普通文件，文件所有者可读可写不可执行，文件所属组只可读，其他所属组只可读

#### 修改文件权限

用chmod命令修改权限

- 文字法：`chmod [who][operator][permission] <file-name>`
- 数字法：`chmod xxx <file-name>`





