const poort = 8080;

const http = require('http');
const { exec } = require("child_process");

module.exports = (html) => {
    http.createServer((_, res) => {
        res.writeHead(200);
        res.end(html);
        process.exit();
    }).listen(poort);

    exec(`xdg-open http://localhost:${poort}`);
}