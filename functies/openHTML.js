const poort = 8080;

const http = require('http');
const { exec } = require("child_process");

module.exports = (html) => {
    const server = http.createServer((_, res) => {
        res.setHeader('Connection', 'close');
        res.end(html);
        server.close();
    });

    server.listen(poort);

    exec(`xdg-open http://localhost:${poort}`);
};