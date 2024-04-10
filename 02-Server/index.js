import * as http from "http"
import * as fs from "fs"
import * as url from "url"

function myHandler(req, res){
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Request Recieved\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile('log.txt', log, (err, data) => {
        switch(myUrl.pathname){
            case '/':
                if(req.method === 'GET') res.end("HomePage");
                break;
            case '/about':
                const username = myUrl.query.user;
                res.end(`Hi ${username}`);
                break;
            case '/search':
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
                break;
            case '/signup':
                if(req.method === 'GET'){
                    res.end("This is a signup Form");
                }else if(req.method === 'POST'){
                    res.end("Success");
                }
                break;
            default: res.end("Error 404: Not Found");
        }
    })
}
const myServer = http.createServer(myHandler);

myServer.listen(8000, () => console.log("Server Started!"));
