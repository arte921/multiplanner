const haalDataOp = require('./haalDataOp.js');

module.exports = async (ctxRecon) => await haalDataOp(`/reisinformatie-api/api/v3/trips/trip?ctxRecon=${ctxRecon}&passing=true`);