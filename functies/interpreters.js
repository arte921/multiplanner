const vertrekTijd = (trip) => new Date(trip.legs[0].origin.plannedDateTime);
const aankomstTijd = (trip) => new Date(trip.legs[trip.legs.length - 1].destination.plannedDateTime);

const extractLeg = (leg, index) => ({
    vertrekstationnaam: leg.origin.name,
    vertrekspoor: leg.origin.actualTrack || leg.origin.plannedTrack,
    aankomstspoor: leg.destination.actualTrack || leg.destination.plannedTrack,
    vertrektijd: new Date(leg.origin.actualDateTime || leg.origin.plannedDateTime),
    aankomsttijd: new Date(leg.destination.actualDateTime || leg.destination.plannedDateTime),
    uitstapzijde: leg.destination.exitSide,
    aankomststationnaam: leg.destination.name,
    ritnummer: leg.product.number,
    richting: leg.direction,
    categorie: leg.product.longCategoryName,
    ritnummer: leg.product.number,
    index: index
});

const eerstAankomendeGeldigeRit = (trips, moment, volgritNummer) => {
    let besteTrip;
    for (const trip of trips) {
        if (trip.status != "NORMAL" || (trip.legs[0].product.number != volgritNummer && new Date(moment.getTime() + 2 * 60000) > vertrekTijd(trip))) continue;
        if (!besteTrip) besteTrip = trip;
        if (aankomstTijd(trip) < aankomstTijd(besteTrip)) besteTrip = trip;
    }
    return besteTrip;
};
module.exports = {
    eerstAankomendeGeldigeRit,
    aankomstTijd,
    extractLeg
};