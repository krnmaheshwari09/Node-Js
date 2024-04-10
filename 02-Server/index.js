import * as http from "http"
import * as fs from "fs"

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Request Recieved\n`
    fs.appendFile('log.txt', log, (err, data) => {
        switch(req.url){
            case '/': res.end("HomePage");
            break;
            case '/about': res.end("I am Karan Maheshwari");
            break;
            default: res.end("Error 404: Not Found");
        }
    })
});

myServer.listen(8000, () => console.log("Server Started!"));
