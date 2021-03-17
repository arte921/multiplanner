const readJSONSync = require('./readJSONSync.js');
const stations = readJSONSync("stations");

module.exports = (stationsNaam) => stations.find((kandidaatStation) => kandidaatStation.naam == stationsNaam);