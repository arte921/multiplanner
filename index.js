const readTXT = require('./functies/readTXT');
const multiReis = require('./functies/multiReis.js');
const formatteerReis = require('./functies/formatteerReis.js');
const writeTXT = require('./functies/writeTXT.js');
const downloadStation = require('./functies/downloadStation');

(async () => {
    const reis = await multiReis(await readTXT("route"));
    const reisScriptNederlands = formatteerReis(reis);

    console.log(reisScriptNederlands);
    writeTXT(reisScriptNederlands, "reis");
})();