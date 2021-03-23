const maakStringLengte = require("./maakStringLengte.js");

const formateerTijdsduurMinuten = (tijdsduur) => {
    const uurdeel = tijdsduur >= 60 ? `${Math.floor(tijdsduur / 60)} uur en ` : "";
    return `${uurdeel}${tijdsduur % 60} minuten`;
}
const formatteerDatum = (date) => date.toLocaleString('en-NL', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam' });
const vertaalZijde = (zijde) => ({
    LEFT: "linkerzijde",
    RIGHT: "rechterzijde"
})[zijde];

const maakTabel = (data) => data.map((rij) => rij.map((waarde, kolomIndex, _, breedte = data.map((rij) => `${rij[kolomIndex]}`.length).reduce((hoogste, huidige) => Math.max(huidige, hoogste))) => maakStringLengte(waarde, breedte, isNaN(waarde) ? undefined : breedte)).join(" ")).join("\n");

module.exports = (reis) => {
    const infoTabel = maakTabel([
        ["Prijs", `€${reis.prijs / 100}`],
        ["Wachttijd", formateerTijdsduurMinuten(reis.stationstijd)],
        ["Rijtijd", formateerTijdsduurMinuten(reis.treintijd)],
        ["Totale reistijd", formateerTijdsduurMinuten(reis.reistijd)],
        ["Hemelsbrede afstand", `${Math.round(reis.hemelsbredeafstand)} kilometer`],
        ["Afgelegde afstand", `${Math.round(reis.afstand)} kilometer`]
    ]);

    const resultaatString = maakTabel([[["Tijd", "Na", "Actie"]].concat(...reis.reis.map((rit) => {
        const zijdeDeel = rit.uitstapzijde ? ` aan de ${vertaalZijde(rit.uitstapzijde)}` : '';
        return [[formatteerDatum(rit.vertrektijd), rit.overstaptijd, `Vertrek in de ${rit.categorie} richting ${rit.richting} op spoor ${rit.vertrekspoor}.`],
            [formatteerDatum(rit.aankomsttijd), rit.ritduur, `Stap${zijdeDeel} uit in ${rit.aankomststationnaam}.`]];
    }))][0]);

    return `${infoTabel}\n${resultaatString}`;
};
