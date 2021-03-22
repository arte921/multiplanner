const vroegsteVolledigeReis = require('./vroegsteVolledigeReis.js');
const stationsLijstAfstand = require('./stationsLijstAfstand.js');
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
    
    for (let i = 1; i < route.length; i++) {
        const trip = await vroegsteVolledigeReis(route[i - 1], route[i], volgendeDatum, volgRitNummer);
        urls.push(trip.shareUrl.uri);
        // await require('./writeJSON.js')(trip, 'bs');
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