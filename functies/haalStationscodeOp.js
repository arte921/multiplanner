const haalDataOp = require('./haalDataOp.js');

module.exports = async (ctxRecon) => {
    const resultaat = await haalDataOp(`/places-api/v2/places?[&type][&limit][&q][&details][&station_code]`);
    
}