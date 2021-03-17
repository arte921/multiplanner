const formateerTijdsduurMinuten = (tijdsduur) => `${Math.floor(tijdsduur / 60)} uur en ${tijdsduur % 60} minuten`;
const formatteerDatum = (date) => date.toLocaleString('en-NL', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam' })
const vertaalZijde = (zijde) => ({
    LEFT: "linkerzijde",
    RIGHT: "rechterzijde"
})[zijde];

module.exports = (reis) => {
    resultaatString = reis.reis.map((rit) => {
        const zijdeDeel = rit.uitstapzijde ? ` aan de ${vertaalZijde(rit.uitstapzijde)}` : '';
        return `Stap voor ${formatteerDatum(rit.vertrektijd)} (binnen ${rit.overstaptijd} minuten) in de ${rit.categorie} richting ${rit.richting} op spoor ${rit.vertrekspoor}.\nStap om ${formatteerDatum(rit.aankomsttijd)}${zijdeDeel} uit in ${rit.aankomststationnaam}.`;
    }).join('\n');
    return `Prijs: €${reis.prijs / 100}. Totale reistijd: ${formateerTijdsduurMinuten(reis.reistijd)}. Totale afstand: ${Math.round(reis.afstand)} kilometer.\n${resultaatString}`;
};
