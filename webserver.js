const http = require('http');
const url = require('url');

const haalWebfileOp = require('./functies/haalWebfileOp.js');
const multiReis = require('./functies/multiReis.js');
const genereerHTMLResulataat = require('./functies/genereerHTMLResulataat.js');
const readJSONSync = require('./functies/readJSONSync.js');
const writeJSONSync = require('./functies/writeJSONSync.js');

const config = readJSONSync("config");

http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const aanvraag = parsedUrl.query.route;
    const href = ["/", ""].includes(parsedUrl.href) ? "index.html" : parsedUrl.href;

    if (!aanvraag) {
        await haalWebfileOp(href).catch(() => {
            res.writeHead(404);
            res.end();
        }).then((file) => {
            res.writeHead(200);
            res.end(file);
        });

        return;
    }

    try {
        res.end(genereerHTMLResulataat(await multiReis(aanvraag)));
    } catch(e) {
        res.end("Deze reis is niet mogelijk.");
    }

}).listen(config.poort);