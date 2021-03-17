const readJSONSync = require('./readJSONSync.js');
const coordinaatAfstand = require('./coordinaatAfstand.js');
const afstanden = readJSONSync("afstanden");

module.exports = (station1, station2) => {
    const station1KleineLetters = station1.toLowerCase();
    const station2KleineLetters = station2.toLowerCase();

    const feature = afstanden.find((feature) => feature.van == station1KleineLetters && feature.naar == station2KleineLetters || feature.van == station2KleineLetters && feature.naar == station1KleineLetters);
    return feature.afstand;
};