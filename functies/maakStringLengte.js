module.exports = (string, lengte, cijfers = `${string}`.length) => `${" ".repeat(cijfers - `${string}`.length)}${string}${" ".repeat(lengte - cijfers)}`;
