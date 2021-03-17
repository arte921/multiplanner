const writeJSON = require("./functies/writeJSON.js");
const haalDataOp = require('./functies/haalDataOp.js');
const writeTXT = require('./functies/writeTXT.js');

(async () => {
    writeJSON(await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/'), 'spoorkaart');
    const stations = await haalDataOp('/reisinformatie-api/api/v2/stations');
    const geformatterdestations = stations.payload.filter((station) => station.land == "NL").map((station) => ({
            code: station.code.toLowerCase(),
            naam: station.namen.lang
        }));
    writeJSON(geformatterdestations, 'stations');
    writeTXT(geformatterdestations.map((station) => station.code + " ".repeat(8 - station.code.length) + station.naam), "stations");
})();
