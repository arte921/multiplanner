const readJSONSync = require('./functies/readJSONSync.js');
const writeTXT = require('./functies/writeTXT.js');
const haalReisOp = require('./functies/haalReisOp.js');
const formatteerReis = require('./functies/formatteerReis.js');
const stationsLijstAfstand = require('./functies/stationsLijstAfstand.js');
const {
    eerstAankomendeGeldigeRit,
    aankomstTijd,
    extractLeg
} = require('./functies/interpreters.js');
const haalTripOp = require('./functies/haalTripOp.js');

const config = readJSONSync("config");

const vroegsteVolledigeReis = async (van, naar, moment, volgRit) => await haalTripOp(eerstAankomendeGeldigeRit((await haalReisOp(van.toUpperCase(), naar.toUpperCase(), moment.toISOString())).trips, moment, volgRit).ctxRecon);

const multiReis = async (route, startmoment, begintijd) => {
    let volgRitNummer;
    let volgendeDatum = startmoment;
    
    let beginDatum = begintijd;
    volgendeDatum = new Date(volgendeDatum.getTime() - 2 * 60 * 1000);

    let resultaat = [];
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
    let gepaseerdeStations = [];
    resultaat.forEach((reisdeel, reisdeelIndex) => reisdeel.stations.filter((_, stationIndex) => reisdeelIndex == 0 || stationIndex > 0).forEach((station) => gepaseerdeStations.push(station)));

    return {
        prijs: totalePrijsCent,
        reistijd: reistijd,
        urls: urls,
        reis: resultaat,
        gepasseerdestations: gepaseerdeStations,
        afstand: stationsLijstAfstand(gepaseerdeStations)
    };
};

(async () => {
    let vertrekmoment = new Date(config.startmoment);
    let route = config.route;
    let begintijd = vertrekmoment;

    if (process.argv.length > 2) {
        begintijd = new Date();
        args = process.argv.slice(2);
        const laatste = args[args.length - 1];
        if (!isNaN(laatste)) {
            vertrekmoment = new Date(begintijd.getTime() + laatste * 1000 * 60);
            route = args.slice(0, -1);
        } else {
            vertrekmoment = begintijd;
            route = args;
        }
    }

    const reis = await multiReis(route, vertrekmoment, begintijd);
    const reisScriptNederlands = formatteerReis(reis);
    console.log(reisScriptNederlands);
    writeTXT(reis.gepasseerdestations, "gepasseerd");
    writeTXT(reis.urls, "bewijs");
    writeTXT(reisScriptNederlands, "reis");
})();