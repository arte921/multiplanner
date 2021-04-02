const http = require('http');
const { exec } = require("child_process");

const readJSON = require('./functies/readJSON.js');
const writeTXT = require('./functies/writeTXT.js');
const formatteerReis = require('./functies/formatteerReis.js');
const multiReis = require('./functies/multiReis.js');
const genereerHTMLResulataat = require('./functies/genereerHTMLResulataat.js');

let reisHTML = "Nog geen reis berekend";

(async () => {
    const config = await readJSON("config");

    let vertrekmoment = new Date(config.startmoment);
    let route = config.route;
    let begintijd = vertrekmoment;

    if (process.argv.length > 2) {
        begintijd = new Date();
        args = process.argv.slice(2);
        const laatste = args[args.length - 1];
        if (!isNaN(laatste)) {
            vertrekmoment = new Date(begintijd.getTime() + laatste * 1000 * 60);
            route = args.slice(0, -1);
        } else {
            vertrekmoment = begintijd;
            route = args;
        }
    }

    const reis = await multiReis(route, vertrekmoment, begintijd);
    const reisScriptNederlands = formatteerReis(reis);
    reisHTML = genereerHTMLResulataat(reis);
    exec("xdg-open http://localhost:8080");
    
    console.log(reisScriptNederlands);
    writeTXT(reis.gepasseerdestations, "gepasseerd");
    writeTXT(reis.urls, "bewijs");
    writeTXT(reisScriptNederlands, "reis");
})();

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(reisHTML);
    process.exit();    
});

server.listen(8080);