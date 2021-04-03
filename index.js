const chrono = require('chrono-node');

const readTXT = require('./functies/readTXT');
const writeTXT = require('./functies/writeTXT.js');
const formatteerReis = require('./functies/formatteerReis.js');
const multiReis = require('./functies/multiReis.js');
const genereerHTMLResulataat = require('./functies/genereerHTMLResulataat.js');
const openHTML = require('./functies/openHTML.js');
const zoekStation = require('./functies/zoekStation.js');

let reisHTML = "Nog geen reis berekend";

(async () => {
    const stationslijst = (await readTXT("route")).split("\n");

    let route = stationslijst.filter((regel) => !!regel).map((regel) => isNaN(regel) ? chrono.parseDate(regel) || zoekStation(regel.toLowerCase()).code : regel);

    const reis = await multiReis(route);
    reisHTML = genereerHTMLResulataat(reis);
    openHTML(reisHTML);

    const reisScriptNederlands = formatteerReis(reis);
    console.log(reisScriptNederlands);

    writeTXT(reisScriptNederlands, "reis");
    writeTXT(reisHTML, "reishtml");
    writeTXT(reis.gepasseerdestations, "gepasseerd");
    writeTXT(reis.urls, "bewijs");
})();