let http = require("http");
let fs = require("fs");
let unzipper = require("unzipper");

http.createServer(function(request, response) {
    console.log(request.headers);
    console.log("GIAO");

    // let onFile = fs.createWriteStream("../server/public/sample.zip");

    // request.pipe(onFile);

    request.pipe(unzipper.Extract({path: "../server/public"}))

    // request.on("data", chunk => {
    //     console.log(chunk.toString());
    //     onFile.write(chunk);
    // });
    // request.on("end", chunk => {
    //     onFile.end();
    //     response.end("Success");
    // })
    
}).listen(8082)