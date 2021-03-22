const haalTripOp = require('./haalTripOp.js');
const haalReisOp = require('./haalReisOp.js');
const {
    eerstAankomendeGeldigeRit
} = require('./interpreters.js');

module.exports = async (van, naar, moment, volgRit) => await haalTripOp(eerstAankomendeGeldigeRit((await haalReisOp(van.toUpperCase(), naar.toUpperCase(), moment.toISOString())).trips, moment, volgRit).ctxRecon);
