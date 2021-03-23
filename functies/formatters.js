const minimaalNul = (getal) => getal < 0 ? 0 : getal; 
const maakStringLengte = (string, lengte, cijfers = `${string}`.length) => `${" ".repeat(minimaalNul(cijfers - `${string}`.length))}${string}${minimaalNul(" ".repeat(lengte - cijfers))}`;
const maakTabel = (data) => data.map((rij) => rij.map((waarde, kolomIndex, _, breedte = data.map((rij) => `${rij[kolomIndex]}`.length).reduce((hoogste, huidige) => Math.max(huidige, hoogste))) => maakStringLengte(waarde, breedte, isNaN(waarde) ? undefined : breedte)).join(" ")).join("\n");

module.exports = {
    maakStringLengte,
    maakTabel
};