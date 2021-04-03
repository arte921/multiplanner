const vroegsteVolledigeReis = require('./vroegsteVolledigeReis.js');
const polylineAfstand = require('./polylineAfstand.js');
const stationsLijstPolyline = require('./stationsLijstPolyline.js');
const coordinaatAfstand = require('./coordinaatAfstand.js');
const {
    aankomstTijd,
    extractLeg
} = require('./interpreters.js');

module.exports = async (route) => {
    let volgRitNummer;
    let volgendeDatum = new Date();
    let begintijd;

    let resultaat = [];
    let totalePrijsCent = 0;
    let urls = [];

    let treintijd = 0;
    let stationstijd = 0;
    
    for (let i = 0; i < route.length; i++) {
        if (!isNaN(route[i]) || route[i] instanceof Date) continue;
        // huidige index wijst naar een stationscode
        const huidigStation = route[i];

        let vorigStation;
        if (route[i - 1] instanceof Date) {
            volgendeDatum = route[i - 1];
            vorigStation = route[i - 2];
        } else if (isNaN(route[i - 1])) {
            vorigStation = route[i - 1];
        } else {
            vorigStation = route[i - 2];
            volgendeDatum = new Date(volgendeDatum.getTime() + 1000 * 60 * route[i - 1]);
        }
        
        if (!vorigStation) continue;

        begintijd = begintijd || volgendeDatum;

        const trip = await vroegsteVolledigeReis(vorigStation, huidigStation, volgendeDatum, volgRitNummer);
        urls.push(trip.shareUrl.uri);
        
        const rit = trip.legs.map(extractLeg);
        totalePrijsCent += trip.productFare.priceInCentsExcludingSupplement; //priceInCents;

        volgendeDatum = aankomstTijd(trip);
        volgRitNummer = rit[rit.length - 1].ritnummer;
        resultaat.push(...rit);
    }

    let beginDatum = begintijd;
    for (const [index, rit] of resultaat.entries()) {
        rit.overstaptijd = Math.floor((rit.vertrektijd - beginDatum) / 60 / 1000);
        if (index > 0) stationstijd += rit.overstaptijd;
        treintijd += rit.ritduur;
        beginDatum = rit.aankomsttijd;
    }

    const reistijd = (resultaat[resultaat.length - 1].aankomsttijd - resultaat[0].vertrektijd) / 1000 / 60;
    let gepaseerdeStations = [];
    resultaat.forEach((reisdeel, reisdeelIndex) => reisdeel.stations.filter((_, stationIndex) => reisdeelIndex == 0 || stationIndex > 0).forEach((station) => gepaseerdeStations.push(station)));
    const polyline = stationsLijstPolyline(gepaseerdeStations);

    return {
        prijs: totalePrijsCent,
        reistijd: reistijd,
        urls: urls,
        reis: resultaat,
        gepasseerdestations: gepaseerdeStations,
        afstand: polylineAfstand(polyline),
        hemelsbredeafstand: coordinaatAfstand(polyline[0], polyline[polyline.length - 1]),
        polyline: polyline,
        treintijd: treintijd,
        stationstijd: stationstijd
    };
};