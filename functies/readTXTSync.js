const fs = require("fs");
const path = require("path");

module.exports = (locatie) => fs.readFileSync(path.join("opslag", locatie + ".txt"));