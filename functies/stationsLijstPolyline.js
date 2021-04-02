const readJSONSync = require('./readJSONSync.js');
const vindStation = require('./vindStation.js');

const spoorkaart = readJSONSync("spoorkaart");

module.exports = (stations) => {
    let vorigStation = "";
    let polyline = [];

    stations.forEach((station, index) => {
        const volledigStation = vindStation(station);
        
        if (index != 0) {
            const feature = spoorkaart.payload.features.find((feature) => feature.properties.to == volledigStation.code && feature.properties.from == vorigStation.code || feature.properties.from == vorigStation.code && feature.properties.to ==  volledigStation.code);
            const coordinaten = feature ? feature.geometry.coordinates : [vorigStation.coordinaat, volledigStation.coordinaat]; 

            // console.log(feature);

            polyline.push(...coordinaten.map((coordinaat) => ({
                lat: coordinaat[1],
                lng: coordinaat[0]
            })));
        }

        vorigStation = volledigStation;
    });
    
    return polyline;
}