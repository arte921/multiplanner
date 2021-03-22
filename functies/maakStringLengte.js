const minimaalNul = (getal) => getal < 0 ? 0 : getal; 

module.exports = (string, lengte, cijfers = `${string}`.length) => `${" ".repeat(minimaalNul(cijfers - `${string}`.length))}${string}${" ".repeat(lengte - cijfers)}`;
