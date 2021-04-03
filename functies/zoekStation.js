const readJSONSync = require('./readJSONSync.js');
const stations = [].concat(...readJSONSync("stations").map((station) => station.namen));
const stringSimilarity = require("string-similarity");
const vindStation = require('./vindStation.js');

module.exports = (stationsNaam) =>  vindStation(stringSimilarity.findBestMatch(stationsNaam, stations).bestMatch.target);