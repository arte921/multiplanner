const readJSONSync = require('./readJSONSync.js');
const spoorkaart = readJSONSync("spoorkaart");

module.exports = (stationa, stationb) => {
    const rechtefeature = spoorkaart.payload.features.find((feature) => feature.properties.from == stationa.code && feature.properties.to == stationb.code);
    if (rechtefeature) return rechtefeature.geometry.coordinates;
    const omgekeerdefeature = spoorkaart.payload.features.find((feature) => feature.properties.to == stationa.code && feature.properties.from == stationb.code);
    if (omgekeerdefeature) return [...omgekeerdefeature.geometry.coordinates].reverse();
    return [stationa.coordinaat, stationb.coordinaat];
};