const minimaalNul = (getal) => getal < 0 ? 0 : getal; 
const maakStringLengte = (string, lengte, cijfers = `${string}`.length) => `${" ".repeat(minimaalNul(cijfers - `${string}`.length))}${string}${minimaalNul(" ".repeat(lengte - cijfers))}`;
const maakTabel = (data) => data.map((rij) => rij.map((waarde, kolomIndex, _, breedte = data.map((rij) => `${rij[kolomIndex]}`.length).reduce((hoogste, huidige) => Math.max(huidige, hoogste))) => maakStringLengte(waarde, breedte, isNaN(waarde) ? undefined : breedte)).join(" ")).join("\n");
const formateerTijdsduurMinuten = (tijdsduur) => `${tijdsduur >= 60 ? `${Math.floor(tijdsduur / 60)} uur en ` : ""}${tijdsduur % 60} ${tijdsduur % 60 == 1 ? "minuut" : "minuten"}`;
const formatteerTijd = (date) => date.toLocaleString('en-NL', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam' });
const formatteerDatum = (date) => date.toLocaleDateString("nl-NL", {day: 'numeric', month: 'long', year: 'numeric'});
const vertaalZijde = (zijde) => ({
    LEFT: "Links",
    RIGHT: "Rechts"
})[zijde] || "Onbekend";

module.exports = {
    maakTabel,
    formateerTijdsduurMinuten,
    formatteerTijd,
    formatteerDatum,
    vertaalZijde
};