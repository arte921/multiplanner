const openHTML = require('./functies/openHTML.js');
const readTXT = require('./functies/readTXT.js')

readTXT("reishtml").then(openHTML);