const writeJSON = require("./functies/writeJSON.js");
const haalDataOp = require('./functies/haalDataOp.js');
const writeTXT = require('./functies/writeTXT.js');
const coordinaatAfstand = require('./functies/coordinaatAfstand.js');
const {
    maakTabel
} = require("./functies/formatters.js");

const polylineAfstand = (polyline) => {
    let afstand = 0;
    for (let i = 1; i < polyline.length; i++) {
        afstand += coordinaatAfstand(polyline[i], polyline[i - 1]);
    }
    return afstand;
};

(async () => {
    const spoorkaart = await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/');
    const stations = await haalDataOp('/reisinformatie-api/api/v2/stations');

    const geformatterdestations = stations.payload.filter((station) => station.land == "NL").map((station) => ({
        code: station.code.toLowerCase(),
        naam: station.namen.lang,
        coordinaat: [station.lng, station.lat]
    }));

    writeJSON(geformatterdestations, 'stations');
    writeJSON(spoorkaart, 'spoorkaart');
    writeTXT(maakTabel(geformatterdestations.map((station) => [station.code, station.naam])), "stations");
})();
