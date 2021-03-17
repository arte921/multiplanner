const writeJSON = require("./functies/writeJSON.js");
const haalDataOp = require('./functies/haalDataOp.js');
const writeTXT = require('./functies/writeTXT.js');
const coordinaatAfstand = require('./functies/coordinaatAfstand.js');
const polylineAfstand = (polyline) => {
    let afstand = 0;
    for (let i = 1; i < polyline.length; i++) {
        afstand += coordinaatAfstand(polyline[i], polyline[i - 1]);
    }
    return afstand;
};

(async () => {
    writeJSON((await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/')).payload.features.map((feature) => ({
        van: feature.properties.from,
        naar: feature.properties.to,
        afstand: polylineAfstand(feature.geometry.coordinates)
    })), 'afstanden');
    const stations = await haalDataOp('/reisinformatie-api/api/v2/stations');
    const geformatterdestations = stations.payload.filter((station) => station.land == "NL").map((station) => ({
            code: station.code.toLowerCase(),
            naam: station.namen.lang
        }));
    writeJSON(geformatterdestations, 'stations');
    writeTXT(geformatterdestations.map((station) => station.code + " ".repeat(8 - station.code.length) + station.naam), "stations");
})();
