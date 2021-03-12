const haalDataOp = require('./haalDataOp.js');
const writeJSON = require('./writeJSON.js');

module.exports = async () => {
    await writeJSON(await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/'), 'spoorkaart');
    await writeJSON(await haalDataOp('/reisinformatie-api/api/v2/stations'), 'stations');
};