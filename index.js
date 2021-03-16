const readJSONSync = require('./functies/readJSONSync.js');
const writeTXT = require('./functies/writeTXT.js');
const haalReisOp = require('./functies/haalReisOp.js');
const formatteerReis = require('./functies/formatteerReis.js');
const {
    eerstAankomendeGeldigeRit,
    aankomstTijd,
    extractLeg
} = require('./functies/interpreters.js');
const haalTripOp = require('./functies/haalTripOp.js');

const config = readJSONSync("config");

const vroegsteVolledigeReis = async (van, naar, moment, volgRit) => await haalTripOp(eerstAankomendeGeldigeRit((await haalReisOp(van.toUpperCase(), naar.toUpperCase(), moment.toISOString())).trips, moment, volgRit).ctxRecon);

const multiReis = async (stations, startmoment) => {    
    let resultaat = [];
    let volgendeDatum = startmoment;
    let volgRitNummer;
    let route = stations;

    if (process.argv.length > 2) {
        volgendeDatum = new Date();
        route = process.argv.slice(2);
    }
    
    let beginDatum = volgendeDatum;
    volgendeDatum = new Date(volgendeDatum.getTime() - 2 * 60 * 1000);

    let totalePrijsCent = 0;
    let urls = [];
    
    for (let i = 1; i < route.length; i++) {
        const trip = await vroegsteVolledigeReis(route[i - 1], route[i], volgendeDatum, volgRitNummer);
        urls.push(trip.shareUrl.uri);
        // await require('./functies/writeJSON.js')(trip, 'bs');
        // return;
        const rit = trip.legs.map(extractLeg);
        totalePrijsCent += trip.productFare.priceInCentsExcludingSupplement; //priceInCents;

        volgendeDatum = aankomstTijd(trip);
        volgRitNummer = rit[rit.length - 1].ritnummer;
        resultaat.push(...rit);
    }

    for (const rit of resultaat) {
        rit.overstaptijd = Math.floor((rit.vertrektijd - beginDatum) / 60 / 1000);
        beginDatum = rit.aankomsttijd;
    }

    const reistijd = (resultaat[resultaat.length - 1].aankomsttijd - resultaat[0].vertrektijd) / 1000 / 60;

    return {
        prijs: totalePrijsCent,
        reistijd: reistijd,
        urls: urls,
        reis: resultaat
    };
};

(async () => {
    const reis = await multiReis(config.route, new Date(config.startmoment));
    const reisScriptNederlands = formatteerReis(reis);
    console.log(reisScriptNederlands);
    writeTXT(reis.reis.map((reisdeel, reisdeelIndex) => reisdeel.stations.filter((_, stationIndex) => reisdeelIndex == 0 || stationIndex > 0).join("\n")).join("\n"), "gepasseerd");
    writeTXT(reis.urls.join("\n") + "\n", "bewijs");
    writeTXT(reisScriptNederlands, "reis");
})();