const readTXT = require('./functies/readTXT');
const multiReis = require('./functies/multiReis.js');
const genereerHTMLResulataat = require('./functies/genereerHTMLResulataat.js');
const openHTML = require('./functies/openHTML.js');
const formatteerReis = require('./functies/formatteerReis.js');
const writeTXT = require('./functies/writeTXT.js');

(async () => {
    const reis = await multiReis(await readTXT("route"));

    const reisHTML = genereerHTMLResulataat(reis);
    openHTML(reisHTML, 5000);

    const reisScriptNederlands = formatteerReis(reis);
    console.log(reisScriptNederlands);

    writeTXT(reisScriptNederlands, "reis");
    writeTXT(reisHTML, "reishtml");
    writeTXT(reis.gepasseerdestations, "gepasseerd");
    writeTXT(reis.urls, "bewijs");
})();