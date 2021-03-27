const stationAfstand = require('./stationAfstand.js');
const vindStation = require('./vindStation.js');

module.exports = (stations) => {
    let vorigStation = "";
    let afstand = 0;

    stations.forEach((station, index) => {
        const volledigStation = vindStation(station);
        
        if (index != 0) {
            afstand += stationAfstand(vorigStation, volledigStation);
        }

        vorigStation = volledigStation;
    });

    return afstand;
}