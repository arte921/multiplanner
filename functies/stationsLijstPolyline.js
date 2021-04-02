const vindStation = require('./vindStation.js');
const haalPolylineOp = require("./haalPolylineOp.js");

module.exports = (stations) => {
    let vorigStation = "";
    let polyline = [];

    stations.forEach((station, index) => {
        const volledigStation = vindStation(station);
        
        if (index != 0) {
            polyline.push(...haalPolylineOp(volledigStation, vorigStation).map((coordinaat) => ({
                lat: coordinaat[1],
                lng: coordinaat[0]
            })));
        }

        vorigStation = volledigStation;
    });
    
    return polyline;
}