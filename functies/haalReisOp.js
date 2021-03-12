const haalDataOp = require('./haalDataOp.js');

module.exports = async (beginStation, eindStation, vertrekTijd) => await haalDataOp(`/reisinformatie-api/api/v3/trips?fromStation=${beginStation}&toStation=${eindStation}&dateTime=${vertrekTijd}&yearCard=true`);