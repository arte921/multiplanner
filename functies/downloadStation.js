const haalDataOp = require('./haalDataOp.js');

let i = 0;
let stations = ["AH", "ASD", "AMF"];

module.exports = async (query) => {
    return {
        stationCode: stations[i++]
    };
    const resultaat = await haalDataOp(`/places-api/v2/places?q=${encodeURIComponent(query)}&type=stationV2&limit=1&details=true`);
    if (!resultaat.payload) throw `Geen station gevonden voor ${query}.`;
    return resultaat.payload[0].locations[0];
};