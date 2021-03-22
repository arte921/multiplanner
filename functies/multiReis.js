const vroegsteVolledigeReis = require('./vroegsteVolledigeReis.js');
const stationsLijstAfstand = require('./stationsLijstAfstand.js');
const coordinaatAfstand = require('./coordinaatAfstand.js');
const {
    aankomstTijd,
    extractLeg
} = require('./interpreters.js');

module.exports = async (route, startmoment, begintijd) => {
    let volgRitNummer;
    let volgendeDatum = startmoment;
    
    let beginDatum = begintijd;
    volgendeDatum = new Date(volgendeDatum.getTime() - 2 * 60 * 1000);

    let resultaat = [];
    let totalePrijsCent = 0;
    let urls = [];

    let begincoordinaat;
    let eindcoordinaat;

    let treintijd = 0;
    let stationstijd = 0;
    
    for (let i = 1; i < route.length; i++) {
        const trip = await vroegsteVolledigeReis(route[i - 1], route[i], volgendeDatum, volgRitNummer);
        urls.push(trip.shareUrl.uri);
        // await require('./writeJSON.js')(trip, 'bs');
        // return;
        const rit = trip.legs.map(extractLeg);
        totalePrijsCent += trip.productFare.priceInCentsExcludingSupplement; //priceInCents;

        if (i == 1) begincoordinaat = [trip.legs[0].origin.lng, trip.legs[0].origin.lat];
        if (i == route.length - 1) eindcoordinaat = [trip.legs[trip.legs.length - 1].destination.lng, trip.legs[trip.legs.length - 1].destination.lat];

        volgendeDatum = aankomstTijd(trip);
        volgRitNummer = rit[rit.length - 1].ritnummer;
        resultaat.push(...rit);
    }

    for (const [index, rit] of resultaat.entries()) {
        rit.overstaptijd = Math.floor((rit.vertrektijd - beginDatum) / 60 / 1000);
        if (index > 0) stationstijd += rit.overstaptijd;
        treintijd += rit.ritduur;
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
        afstand: stationsLijstAfstand(gepaseerdeStations),
        hemelsbredeafstand: coordinaatAfstand(begincoordinaat, eindcoordinaat),
        treintijd: treintijd,
        stationstijd: stationstijd
    };
};