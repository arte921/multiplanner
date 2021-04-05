const {
    updateMultiplanner
} = require('multiplanner');

const readJSON = require("./functies/readJSON.js");

(async () => {
    const config = await readJSON("config");
    updateMultiplanner(config.ns_app_key_primary);
})();