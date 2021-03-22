const formateerTijdsduurMinuten = (tijdsduur) => `${Math.floor(tijdsduur / 60)} uur en ${tijdsduur % 60} minuten`;
const formatteerDatum = (date) => date.toLocaleString('en-NL', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam' });
const maakStringLengte = (string, lengte) => `${string}${" ".repeat(lengte - `${string}`.length - 1)}`;
const vertaalZijde = (zijde) => ({
    LEFT: "linkerzijde",
    RIGHT: "rechterzijde"
})[zijde];

const wachtlengte = 3;

module.exports = (reis) => {
    resultaatString = reis.reis.map((rit, index) => {
        const overstapDeel = index == 0 ? '' : ` na ${rit.overstaptijd} minuten`
        const zijdeDeel = rit.uitstapzijde ? ` aan de ${vertaalZijde(rit.uitstapzijde)}` : '';
        return `${formatteerDatum(rit.vertrektijd)} ${maakStringLengte(rit.overstaptijd, wachtlengte)} Vertrek in de ${rit.categorie} richting ${rit.richting} op spoor ${rit.vertrekspoor}.\n${formatteerDatum(rit.aankomsttijd)} ${maakStringLengte(rit.ritduur, wachtlengte)} Stap${zijdeDeel} uit in ${rit.aankomststationnaam}.`;
    }).join('\n');
    return `Prijs: €${reis.prijs / 100}.\nTotale reistijd: ${formateerTijdsduurMinuten(reis.reistijd)}.\nTotale afstand: ${Math.round(reis.afstand)} kilometer.\nHemelsbrede afstand: ${Math.round(reis.hemelsbredeafstand)} kilometer.\nTijd  Ew Actie\n${resultaatString}`;
};
