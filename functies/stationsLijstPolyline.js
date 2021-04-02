const vindStation = require('./vindStation.js');
const haalPolylineOp = require("./haalPolylineOp.js");

module.exports = (stations) => {
    let polyline = [];

    const volledigestations = stations.map(vindStation);

    for (let i = 1; i < volledigestations.length; i++) {
        polyline.push(...haalPolylineOp(volledigestations[i - 1], volledigestations[i]).map((coordinaat) => ({
            lat: coordinaat[1],
            lng: coordinaat[0]
        })));
    };
    
    return polyline;
}