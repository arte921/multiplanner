const readJSONSync = require('./readJSONSync.js');
const stations = readJSONSync("stations").map((station) => station.naam);
const stringSimilarity = require("string-similarity");
const vindStation = require('./vindStation.js');

module.exports = (stationsNaam) =>  vindStation(stringSimilarity.findBestMatch(stationsNaam, stations).bestMatch.target);