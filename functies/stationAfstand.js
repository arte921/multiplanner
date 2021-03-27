const readJSONSync = require('./readJSONSync.js');
const coordinaatAfstand = require('./coordinaatAfstand.js');
const afstanden = readJSONSync("afstanden");

module.exports = (station1, station2) => {
    const feature = afstanden.find((feature) => feature.van == station1.code && feature.naar == station2.code || feature.van == station2.code && feature.naar ==  station1.code);
    if (!feature) return coordinaatAfstand(station1.coordinaat, station2.coordinaat);
    return feature.afstand;
};