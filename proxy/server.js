if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const fs = require("fs");
let request = require("request");
const https = require("https");
const url = require("url");
const port = 3001;

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
  
https.createServer(options, function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.api == 1) {
        let videoReq_YT = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${queryObject.search}&key=AIzaSyAIQJPlZn0fYnPHf24x1echa0-J1_3Z2U8`;
        request(videoReq_YT,function(error,response,body) {
            res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-origin':'*'});
            res.write(body);
            res.end();
        })

        
    } else if (queryObject.api == 2) {
        // request(login_FB, function(error, response, body) {
        //     if (error) {
        //         console.log("ERROR:",error);
        //     } else {
        //         res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-origin':'*'});
        //         res.write(body);
        //         res.end();
        //     }
        // });
    } else {
        let likesReq_FB = `https://graph.facebook.com/me?fields=name,likes{name,category,cover}&access_token=${queryObject.token}`;
        // console.log(likesReq_FB);
        request(likesReq_FB, function(error, response, body) {
            res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-origin':'*'});
            res.write(body);
            res.end();
        });
    }

}).listen(port, () => {
    console.log("LISTENING on port:", port);
});