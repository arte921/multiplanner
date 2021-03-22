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

const wachtlengte = 3;
const wachtcijfers = 2;
const infolengte = 21;

module.exports = (reis) => {
    resultaatString = reis.reis.map((rit, index) => {
        const zijdeDeel = rit.uitstapzijde ? ` aan de ${vertaalZijde(rit.uitstapzijde)}` : '';
        return `${formatteerDatum(rit.vertrektijd)} ${maakStringLengte(rit.overstaptijd, wachtlengte, wachtcijfers)}Vertrek in de ${rit.categorie} richting ${rit.richting} op spoor ${rit.vertrekspoor}.\n${formatteerDatum(rit.aankomsttijd)} ${maakStringLengte(rit.ritduur, wachtlengte, wachtcijfers)}Stap${zijdeDeel} uit in ${rit.aankomststationnaam}.`;
    }).join('\n');
    return `${maakStringLengte("Prijs", infolengte)}€${reis.prijs / 100}\n${maakStringLengte("Wachttijd", infolengte)}${formateerTijdsduurMinuten(reis.stationstijd)}\n${maakStringLengte("Rijtijd", infolengte)}${formateerTijdsduurMinuten(reis.treintijd)}\n${maakStringLengte("Totale reistijd", infolengte)}${formateerTijdsduurMinuten(reis.reistijd)}\n${maakStringLengte("Hemelsbrede afstand", infolengte)}${Math.round(reis.hemelsbredeafstand)} kilometer\n${maakStringLengte("Afgelegde afstand", infolengte)}${Math.round(reis.afstand)} kilometer\nTijd  Na Actie\n${resultaatString}`;
};
