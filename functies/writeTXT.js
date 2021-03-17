const fs = require("fs");
const path = require("path");

module.exports = async (input, locatie) => await fs.promises.writeFile(path.join("opslag", locatie + ".txt"), Array.isArray(input) ? input.join("\n") + "\n" : input);