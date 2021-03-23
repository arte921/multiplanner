const {
    maakTabel,
    formateerTijdsduurMinuten,
    formatteerDatum,
    vertaalZijde
} = require("./formatters.js");

module.exports = (reis) => {
    const infoTabel = maakTabel([
        ["Prijs", `€${(reis.prijs / 100).toFixed(2)}`],
        ["Wachttijd", formateerTijdsduurMinuten(reis.stationstijd)],
        ["Rijtijd", formateerTijdsduurMinuten(reis.treintijd)],
        ["Totale reistijd", formateerTijdsduurMinuten(reis.reistijd)],
        ["Hemelsbrede afstand", `${Math.round(reis.hemelsbredeafstand)} kilometer`],
        ["Afgelegde afstand", `${Math.round(reis.afstand)} kilometer`]
    ]);

    const resultaatString = maakTabel([[["Tijd", "Na", "Actie"]].concat(...reis.reis.map((rit) => {
        const zijdeDeel = rit.uitstapzijde ? ` ${vertaalZijde(rit.uitstapzijde)}` : '';
        return [[formatteerDatum(rit.vertrektijd), rit.overstaptijd, `\x1b[32mNeem de ${rit.categorie} richting ${rit.richting} op spoor ${rit.vertrekspoor}.\x1b[0m`],
            [formatteerDatum(rit.aankomsttijd), rit.ritduur, `\x1b[31mStap${zijdeDeel} uit in ${rit.aankomststationnaam}.\x1b[0m`]];
    }))][0]);

    return `${infoTabel}\n${resultaatString}`;
};
