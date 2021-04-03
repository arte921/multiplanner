const fs = require("fs");
const path = require("path");

module.exports = async (locatie) => (await fs.promises.readFile(path.join("opslag", locatie + ".txt"))).toString();