let http = require("http");
let https = require("https");
let fs = require("fs");
let unzipper = require("unzipper");
let querystring = require("querystring");


//2. auth路由：接收code，用client_id和client_secret换token
function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    console.log(query);
    getToken(query.code, info => {
        // console.log(info);
        // console.log(JSON.stringify(info));
        //response.write(JSON.stringify(info));

        response.write(`<a href="http://localhost:8083?token=${info.access_token}">publish</a>`)
        response.end();
    });
}

//换token
function getToken(code, callback) {
    let request = https.request({       //注意是https.request，不是https.createServer
        hostname: "github.com",
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.4ade24d3fddba2f8&client_secret=c0b8378f033b538726351609a4f253e00a64212e`,
        method: "POST",
        port: 443
    },function(response) {
        let body = "";
        response.on("data", chunk => {  
            body += (chunk.toString());
            //return;         //为啥加了return;后就可以log输出了？
        })
        response.on("end", chunk => {
            callback(querystring.parse(body));
        })
    });
    request.end();
}

//4. publish路由：用token换用户信息，检查权限，接收发布
function publish(request, response) {
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);

    request.pipe(unzipper.Extract({path: "../server/public"}))
    getUser(query.token, info => {
        if(info.login === "Yuansheng-Liang") {
            request.pipe(unzipper.Extract({path: "../server/public"}));
            request.on("end", function(){
                response.end("success!")
            })
        }
    })
}

//获取用户信息
function getUser(token, callback) {
    let request = https.request({       //注意是https.request，不是https.createServer
        hostname: "api.github.com",
        path: `/user`,
        method: "GET",
        port: 443,
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": "giao-publish"
        }
    },function(response) {
        let body = "";
        response.on("data", chunk => {  
            body += (chunk.toString());
            //return;         //为啥加了return;后就可以输出了？
        })
        response.on("end", chunk => {
            console.log(body);
            callback(JSON.parse(body));
        })

    });
    request.end();
}

//创建服务器，路由分支
http.createServer(function(request, response) {

    if(request.url.match(/^\/auth\?/))
        return auth(request, response);
    if(request.url.match(/^\/publish\?/))
        return publish(request, response);



//pipe读传    
{
    // request.pipe(onFile);
    //request.pipe(unzipper.Extract({path: "../server/public"}))
}

//流式读传
{
    // let onFile = fs.createWriteStream("../server/public/sample.zip");
    // request.on("data", chunk => {
    //     console.log(chunk.toString());
    //     onFile.write(chunk);
    // });
    // request.on("end", chunk => {
    //     onFile.end();
    //     response.end("Success");
    // })
    
}
}).listen(8082)
