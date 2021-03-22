module.exports = (string, lengte, cijfers = `${string}`.length) => `${"0".repeat(cijfers - `${string}`.length)}${string}${" ".repeat(lengte - cijfers)}`;
