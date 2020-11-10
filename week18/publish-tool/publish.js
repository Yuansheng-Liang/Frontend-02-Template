let http = require('http');
let fs = require("fs");
let archiver = require("archiver");
let child_process = require("child_process");
let querystring = require("querystring");

//1. 打开  https://github.com/login/oauth/authorize
child_process.exec("start https://github.com/login/oauth/authorize?client_id=Iv1.4ade24d3fddba2f8")


//3. 创建server，接收token，点击发布
http.createServer(function(request, response) {
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
    console.log(query);
    publish(query.token);
}).listen(8083);

//发布文件
function publish(token) {

        let request = http.request({
        hostname: "127.0.0.1",
        path: `/publish?token=${token}`,
        port: 8082,
        method: "POST",
        headers: {
            "Context-Type": "appliction/octet-stream"

//            ,"Context-Length": stats.size
        }
    }, response => {
        console.log(response);
    });

    //let file = fs.createReadStream("./sample/sample.html");

    const archive = archiver("zip", {
        zlib: {level: 9}
    });

    archive.directory("./sample", false);
    archive.finalize();

    archive.pipe(request);

    //file.pipe(request);
    //file.on("end", () => request.end());
}



{//fs.stat("./sample/sample.html", (err, stats) => {

//     let request = http.request({
//         hostname: "127.0.0.1",
//         port: 8082,
//         method: "POST",
//         headers: {
//             "Context-Type": "appliction/octet-stream"
// //            ,"Context-Length": stats.size
//         }
//     }, response => {
//         console.log(response);
//     });

//     let file = fs.createReadStream("./sample/sample.html");

//     const archive = archiver("zip", {
//         zlib: {level: 9}
//     });

//     archive.directory("./sample", false);
//     archive.finalize();

//     archive.pipe(request);

    // file.pipe(request);
    // file.on("end", () => request.end());


//});
}



//流式读传
{       
    // file.on('data', chunk => {
    //     console.log(chunk.toString());
    //     request.write(chunk);
    // });

    // file.on("end", chunk => {
    //     request.end(chunk);
    //     console.log("file in read");
    // })
}

