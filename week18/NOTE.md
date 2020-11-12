

# 学习笔记

## 第一节课：初始化服务器运行环境

* 安装虚拟系统

   1. 安装虚拟机软件
      * 选择"VM VirtualBox"，其开源实用
      * [VM VirtualBox 下载地址](https://www.virtualbox.org/wiki/Downloads)
   2. 下载服务器镜像文件
      * 这里选择Ubuntu 20.04.1 LTS (Focal Fossa) 服务器版本（server版）
      * [Ubuntu 20.04.1 LTS (Focal Fossa) 服务器版本（server版）下载地址](https://releases.ubuntu.com/20.04/)
   3. 新建虚拟电脑，选择类型为linux，版本为ubuntu 64
   4. 选择下载好的镜像文件
   5. 其他选项按照默认设置
   6. 将镜像地址改为 http: mirrors.aliyun.com/ubuntu
   7. 在confirm destructive action 中选择 continue
   8. 选择“Install OpenSSH server” 
   9. 安装完毕后重启登录

* 初始化系统环境

  * `sudo apt install nodejs`

  * `sudo apt install npm `

    * `sudo npm install -g n			//安装node版本管理工具`
      * `sudo n latest		//安装最新版本的node和npm`
## 第二节课：利用Express编写服务器

### 初始化server环境

1. 新建文件夹
2. 在终端中打开文件夹，执行`npx express-generator`，初始express环境
3. 执行`npm install`安装依赖（dependencies）
4. 环境初始化完毕

### express文件目录分析

1. `app.js`文件为执行文件，基本上不需要更改

2. `routes, views` 文件夹基本上用不到，可以删除；`app.js`文件内的相关代码也可以删除

3. 主要使用`public`文件夹

### 使用服务器

1. 在终端中输入`npm start`可以快速启动服务器（`npm start `为package.josn文件中“script”下的方法；“script”下的方法只有“start”不需要加 `run`）
2. 浏览器打开localhost（默认地址为`localhost:3000`），即可看到服务器的内容
3. 可以打开服务器上相关内容文件，只需要在localhost地址后加上public文件夹内文件的相对地址。如，`localhost:3000/stylesheets/style.css`
4. 发布内容可以在public内添加文件。如，`index.html`



## 第三节课：将本地服务器迁移至虚拟机上

1. 在虚拟服务器上打开ssh服务：`service ssh start`

2. 这个时候虚拟机默认在22端口进行监听

3. 设置本地和虚拟机的端口映射：
   1. 本地端口：8022(选择默认不冲突的端口即可) --> 虚拟机端口：22
   2. 本地端口：8080(选择默认不冲突的端口即可) --> 虚拟机端口：3000（因为服务器默认在3000端口输出）
   
4. 在本地终端执行scp命令（虚拟服务器打开ssh服务后就可以使用），将本地的所有server文件复制到虚拟机：

   * `scp -P 8022 -r ./* brian@127.0.0.1:home/brian/server`

     * scp 是 secure copy 的缩写, scp 是 linux 系统下基于 ssh 登陆进行安全的远程文件拷贝命令。
     * -P 为 指定端口号
     * 其中8022为之前设置的本地端口
     * -r 表示递归的执行
     * ./* 表示当前目录下的所有文件
     * brian为远程用户名
     * 127.0.0.1 为默认本地地址
     * home/brian/server 为远端路径
   * [参考菜鸟教程](https://www.runoob.com/linux/linux-comm-scp.html)		

5. 在虚拟服务器中执行`npm start`，运行服务器

6. 在本地浏览器中打开地址：[http://localhost:8080](http://localhost:8080)，即可连接上虚拟服务器

## 第四节课：用node启动一个简单的server
1. 新建两个文件夹，用于推送文件和工具"publish-server"和"publish-tool"

2. 在两个文件夹目录里都执行终端：`npm init`

3. 在"publish-server"里新建"server.js"文件

4. 在"server.js"文件里写入代码：
   ```javascript
      let http = require("http");
   
      http.createServer(function(req, res) {
         console.log(req);
         res.end("hello world");
      }).listern(8082)
   ```

   * 也可以参考：[node官网](https://nodejs.org/en/about/)
   
5. ​     在浏览器中打开：[http://localhost:8082/](http://localhost:8082/)，即可看到"hello world"

## 第五节课：编写简单的发送请求功能

1. 在"publish-tool"文件夹里新建"publish.js"文件

2. 在文件里写入代码：

   ```javascript
   let http = require('http');
   
   let request = http.request({
       hostname: "127.0.0.1",
       port: 8082
   }, response => {
       console.log(response);
   });
   
   request.end();
   ```

3. 在终端里运行：`node publish.js`

4. 相关参考：[Anatomy of an HTTP Transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)

## 第六节课：简单了解Node.js的流

[参考node文档](https://nodejs.org/docs/latest-v13.x/api/stream.html#stream_class_stream_readable)

### 读取流

1. readable对象上可用on监听“data”和“end”事件，并以接受的数据作为参数执行回调函数
2. 如，`readable.on("data", chunk => {})`和 `readable.on("end", chunk => {})`

### 写入流

1. writeable对象上有write方法和end方法，传入目标数据作为参数
2. 如，`writeable.write(chunk)`,`writeable.end(chunk)`

### 文件系统

1. 引入文件系统。`let fs = require("fs");`
2. 调用文件系统新建读取流，`let file = fs.createReadStream(path)`，path为字符串，为该文件的路径

### 实际操作

publish.js:

```javascript
let http = require('http');
let fs = require("fs");

let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: "POST",			//新增method属性，没有则默认“GET”方法
    headers: {
        "Context-Type": "appliction/octet-stream"		//流传输header写死，建议阅读HTTP的RFC
    }
}, response => {
    console.log(response);
});

let file = fs.createReadStream("./package.json");		//新建读取流

file.on('data', chunk => {			//监听“data”数据传输流事件
    console.log(chunk.toString());
    request.write(chunk);			//在“data”流中执行写入流
});

file.on("end", chunk => {			//监听数据传输结束事件"end"
    request.end(chunk);				//结束写入流
    console.log("file in read");	
})

```

server.js:

```javascript
let http = require("http");

http.createServer(function(request, response) {
    console.log(request.headers);
    request.on("data", chunk => {		//接收request后，将其按照读取流处理
        console.log(chunk.toString());
    });
    request.on("end", chunk => {		//监听读取流结束
        response.end("Success");
    })
    
}).listen(8082)
```

## 第七节课：改造server

### 整体思路

1. 在./publish-server/server.js中新建写入流，将读入的数据保存（服务器接收的request默认为读取流）
2. 在./publish-server/server.js中用写入流将文件写入并保存在../server/public文件目录中
   * 这样就能利用publish-tool给server传输数据了，并且数据可以在客户端通过server接收
3. 用scp命令将publish-server传输到服务器上
   * 这样就可以从本地的publish-tool传输文件到服务器的publish-server，再通过publish-server往服务器的server传递数据和文件，这样客户端就能从服务器的server访问到数据了
   * 形成了一个 开发者 -> 服务器 -> 用户 的数据传输链条

### 具体实施

1. 在./publish-server/server.js中新建写入流，使用`let onFile = fs.createWriteStream(path)`，这里path为“../server/public/index.html”
2. 使用写入流，在`request.on("data", fn)`中调用`onFile.write(chunk)`;在`request.on("end", fn) `中调用 `onFile.end()`
3. 传递publish-server，在根目录下运行：`scp -r -P 8022 ./* brian@127.0.0.1:/home/brian/publish-server`
4. 在服务器端打开publish-server和server，在本地（开发者）运行publish-tool向服务器的publish-server传输数据，然后用户就可以在服务器接收到新的数据了

### 细节处理

1. 在package.json中进行命令封装，使用“script”简化命令行
   * 简化scp和start（运行）命令
2. 因为publish-server放到虚拟服务器上运行，所以需要新增虚拟机的端口映射设置
   * 将 本地8882 -> 服务端8082（因为publish-server监听8082）
   * 将本地的publish-tool的请求端口改为 8882
3. 在服务器开启publish-server和server时可以使用`npm start&`命令，加了一个“&”，能使命令输入后不堵塞，不影响后续命令输入

### 详细代码

* ./publish-tool:
  * ./publish-tool/publish.js：

    ```javascript
    let http = require('http');
    let fs = require("fs");
    
    let request = http.request({
        hostname: "127.0.0.1",
        port: 8882,			//因为虚拟机的映射，更改端口
        method: "POST",
        headers: {
            "Context-Type": "appliction/octet-stream"
        }
    }, response => {
        console.log(response);
    });
    
    let file = fs.createReadStream("./sample.html");		//改为具体html文件
    
    file.on('data', chunk => {
        console.log(chunk.toString());
        request.write(chunk);
    });
    
    file.on("end", chunk => {
        request.end(chunk);
        console.log("file in read");
    })
    
    ```

  * ./publish-tool/package.json:

    ```json
    {
      "name": "publish-tool",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "start": "node ./publish.js",		//利用“scripts”快捷打开
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
    
    ```

  * ./publish-tool/sample.js:

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GIAO</title>
    </head>
    <body>
        <h1>yi gay worii giao!!!!!!!!!!!</h1>
    </body>
    </html>
    ```

* ./publish-server:

  * ./publish-server/server.js:

    ```javascript
    let http = require("http");
    let fs = require("fs");		//引用文件系统
    
    http.createServer(function(request, response) {
        console.log(request.headers);
    
        let onFile = fs.createWriteStream("../server/public/index.html")	//新建写入流
    
        request.on("data", chunk => {
            console.log(chunk.toString());	
            onFile.write(chunk);		//写入数据
        });
        request.on("end", chunk => {
            onFile.end();		//终止写入
            response.end("Success");
        })
        
    }).listen(8082)
    ```

  * ./publish-server/package.json：

    ```json
    {
      "name": "publish-server",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "start": "node ./server.js",		//快速启动
        "publish": "scp -r -P 8022 ./* brian@127.0.0.1:/home/brian/publish-server",		//快速传输
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
    ```


## 第八节课：实现文件发布系统

### 从读取流往写入流输入数据的简易方式

1. `readStream.pipe(writeStream)`，通过读取流往写入流传输数据
2. `readStream.on("end")`，结束读取流，表示严谨

### 获取文件大小

1. 引用文件系统`const fs = require("fs");`

2. 使用`fs.stat(path[, options], callback)`方法

3. 在callback中获取stats.size，如

   ``````javascript
   fs.stat(path[, options], (err, stats) => {
       stats.size;
   })
   ``````

### 压缩文件：使用archiver

1. 安装archiver，`npm install archiver --save`。作为实际应用的一部分，不用“-dev”参数

2. 引用文件`const archiver = require("archiver");`

3. 设置压缩等级

   ```javascript
   const archive = archiver('zip', {
     zlib: { level: 9 } // Sets the compression level.
   });
   ```

4. 选择压缩目录

   ```javascript
   // append files from a sub-directory, putting its contents at the root of archive
   archive.directory('subdir/', false);
   ```

5. 声明初始化设置完成

   ```javascript
   // finalize the archive (ie we are done appending files but streams have to finish yet)
   // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
   archive.finalize();
   ```

6. 如果需要传输

   ```javascript
   // pipe archive data to the file
   archive.pipe(output);
   ```

7. [archiver参考资料](https://www.npmjs.com/package/archiver)

### 解压文件：使用unzipper

1. 安装unzipper`npm install unzipper --save`，作为服务器的一部分也使用“--save”

2. 引用文件`const unzipper = require("unzipper");`

3. 调用unzipper

   ```javascript
   fs.createReadStream('path/to/archive.zip')
     .pipe(unzipper.Extract({ path: 'output/path' }));
   ```

4. 读取流为request时(使用archiver压缩并pipe时读取流也为request)

   ```javascript
     request.pipe(unzipper.Extract({ path: 'output/path' }));
   ```

5. [unzipper参考文档](https://www.npmjs.com/package/unzipper)

## 第九节课：用GitHub oAuth做一个登录实例

### 主要思想：

1. 注册Git app，获取client_id和client_secret

2. **客户端**打开 https://github.com/login/oauth/authorize+client_id=...（可以使用nodejs的API：child_process执行子程序，来执行命令行的打开网页。windows系统用”start  url“命令，类Linux系统用”open url“命令）

3. **客户端**网页跳转至登录授权页面

4. 授权后客户端网页跳转至回调（callback）URL页面，并被服务端接收URL（URL以querystring的方式带着code信息）

5. **服务端**监听并识别code后，用code，client_id，client_secret到https://github.com/login/oauth/access_token换取token，端口为443，服务器会通过response返回token（以querystring的形式）

6. **服务端**将token以querystring的方式通过超链接的方式（<a>标签）返回给callbackURL的页面，将token下放给客户端，将token回传给客户端以便核实客户端身份（客户端通过request发送token给服务端，token可以验证用户信息，以便服务端将request和token身份匹配，以确认客服端身份）

7. **客户端**点击<a>标签，跳转至指定URL，并通过在客户端建立的server读取URL并分析其中的token信息

8. **客户端**以path的形式通过request往**服务端**发送token并传输文件

9. **服务端**获得token后往https://api.github.com/user发送https类的request，以获取客户端的信息。request headers的内容需要包括：

   ```
   Authorization: token OAUTH-TOKEN
   GET https://api.github.com/user
   ```

10. **服务端**验证客户端身份信息后（一般会对接公司内部的权限系统）就可以允许执行客户端的请求了







​     

​     






​    

​    

​    

​    

​    

​    

​    

​    

​    

​    

​    

