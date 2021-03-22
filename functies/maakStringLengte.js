module.exports = (string, lengte) => `${string}${" ".repeat(lengte - `${string}`.length - 1)}`;
