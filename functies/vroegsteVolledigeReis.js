const haalTripOp = require('./haalTripOp.js');
const haalReisOp = require('./haalReisOp.js');
const {
    eerstAankomendeGeldigeRit
} = require('./interpreters.js');

module.exports = async (van, naar, moment, volgRit) => {
    const reis = await haalReisOp(van, naar, moment.toISOString());
    console.log(reis);
    if (!reis) stop(van, naar);
    const eersVolgendeRit = eerstAankomendeGeldigeRit(reis.trips, moment, volgRit);
    if (!eersVolgendeRit) stop(van, naar);
    const trip = await haalTripOp(eersVolgendeRit.ctxRecon);
    if (!trip) stop(van, naar);
    return trip;    
};

const stop = (van, naar) => {
    throw(`Geen reis gevonden van ${van} naar ${naar}.`);
};
