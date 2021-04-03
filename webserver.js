const http = require('http');
const url = require('url');

const poort = 8080;

const readTXT = require('./functies/readTXT');
const multiReis = require('./functies/multiReis.js');
const genereerHTMLResulataat = require('./functies/genereerHTMLResulataat.js');

http.createServer(async (req, res) => {
    res.writeHead(200);

    const aanvraag = url.parse(req.url, true).query.route;

    if (!aanvraag) {
        res.end(await readTXT("indexhtml"));
        return;
    }

    try {
        res.end(genereerHTMLResulataat(await multiReis(aanvraag)));
    } catch(e) {
        res.end(e.toString());
    }

}).listen(poort);