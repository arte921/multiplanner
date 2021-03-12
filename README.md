# multiplanner
Tool om polydestinale reizen te plannen over het Nederlandse spoornet. Gebruikt de officiele NS api 

# setup
Kopieer `opslag/config.json.example` naar `opslag/config.json` en vul een api key in, te verkrijgen op [https://apiportal.ns.nl/](https://apiportal.ns.nl/).

# \[optioneel\] stations.sh
Om het stations.sh script (handig om stationscodes op te zoeken) te gebruiken moet `stations.dat` uit `ns-latest.zip` van [http://data.ndovloket.nl/ns/](http://data.ndovloket.nl/ns/) in de `opslag` map geplaatst worden.
Alternatief kan ook een ander tekstbestand met naam `stations.dat` worden gebruikt, in een formaat waar elke stationsnaam bijbehorende stationscode op een regel staan. 

# gebruik
Vul de route (een lijst stationscodes) in en een startdatum in `opslag/config.json` en draai `index.js`. Optioneel kan ook een lijst stationscodes worden meegegeven als parameters, zoals `node . nm amf zl ah`. In het laatste geval wordt het config genegeerd en de huidige systeemtijd gebruikt als startmoment.
De stationscodes zijn te verkrijgen door het `stations.sh` script te gebruiken, zoals `./stations.sh amersfoort centraal`. De regels waarin de zoekopdracht (`amersfoort centraal`) voorkomt worden getoond, wat dus ook de stationscode zal bevatten.
