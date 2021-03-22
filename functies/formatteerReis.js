const maakStringLengte = require("./maakStringLengte.js");

const formateerTijdsduurMinuten = (tijdsduur) => `${Math.floor(tijdsduur / 60)} uur en ${tijdsduur % 60} minuten`;
const formatteerDatum = (date) => date.toLocaleString('en-NL', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam' });
const vertaalZijde = (zijde) => ({
    LEFT: "linkerzijde",
    RIGHT: "rechterzijde"
})[zijde];

const wachtlengte = 3;
const wachtcijfers = 2;

module.exports = (reis) => {
    resultaatString = reis.reis.map((rit, index) => {
        const zijdeDeel = rit.uitstapzijde ? ` aan de ${vertaalZijde(rit.uitstapzijde)}` : '';
        return `${formatteerDatum(rit.vertrektijd)} ${maakStringLengte(rit.overstaptijd, wachtlengte, wachtcijfers)}Vertrek in de ${rit.categorie} richting ${rit.richting} op spoor ${rit.vertrekspoor}.\n${formatteerDatum(rit.aankomsttijd)} ${maakStringLengte(rit.ritduur, wachtlengte, wachtcijfers)}Stap${zijdeDeel} uit in ${rit.aankomststationnaam}.`;
    }).join('\n');
    return `Prijs: €${reis.prijs / 100}.\nTotale reistijd: ${formateerTijdsduurMinuten(reis.reistijd)}.\nTotale afstand: ${Math.round(reis.afstand)} kilometer.\nHemelsbrede afstand: ${Math.round(reis.hemelsbredeafstand)} kilometer.\nTijd  Na Actie\n${resultaatString}`;
};
