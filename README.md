# Multiplanner
Tool om polydestinale reizen te plannen over het Nederlandse spoornet. Gebruikt de officiele NS api.

# Setup
Kopieer `opslag/config.json.example` naar `opslag/config.json` en vul een NS api key in, te verkrijgen op [https://apiportal.ns.nl/](https://apiportal.ns.nl/). Vul ook de Google Maps API key in, te verkrijgen op [https://console.cloud.google.com/](https://console.cloud.google.com/)
Draai voor het eerste gebruik het `update.js` script om de spoorkaart en stations te downloaden.

# Gebruik
Vul de route (een lijst stationscodes) in en een startdatum in `opslag/config.json` en draai `index.js`. Optioneel kan ook een lijst stationscodes worden meegegeven als parameters, zoals `node . nm amf zl ah`. In het laatste geval wordt het config genegeerd en de huidige systeemtijd gebruikt als startmoment.
De stationscodes zijn te verkrijgen door het `stations.sh` script te gebruiken, zoals `./stations.sh amersfoort centraal`. De regels waarin de zoekopdracht (`amersfoort centraal`) voorkomt worden getoond, wat dus ook de stationscode zal bevatten. Omgekeerd kan ook op stationscode worden gezocht, om de naam van een station te achterhalen.
