const {
    formatteerTijd,
    formatteerDatum,
    formateerTijdsduurMinuten,
    vertaalZijde
} = require("./formatters.js");

const readJSONSync = require('./readJSONSync.js');
const config = readJSONSync("config");

module.exports = (reis) => {
    const reisTabel = reis.reis.map((reisdeel) => `
        <tr>
            <td>${formateerTijdsduurMinuten(reisdeel.overstaptijd)}</td>
            <td>${reisdeel.vertrekstationnaam}</td>
            <td>${reisdeel.vertrekspoor}</td>
            <td>${formatteerTijd(reisdeel.vertrektijd)}</td>
            <td>${reisdeel.categorie}</td>
            <td>${reisdeel.richting}</td>
            <td>${formateerTijdsduurMinuten(reisdeel.ritduur)}</td>
            <td>${formatteerTijd(reisdeel.aankomsttijd)}</td>
            <td>${reisdeel.aankomststationnaam}
            <td>${reisdeel.aankomstspoor}</td>
            <td>${vertaalZijde(reisdeel.uitstapzijde)}</td>
        </tr>
    `).join("");

    return `
<!DOCTYPE html>
<html lang="en">

<html>
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        
        <title>Reis van ${reis.reis[0].vertrekstationnaam} naar ${reis.reis[reis.reis.length - 1].aankomststationnaam}</title>
        <link rel="stylesheet" href="bootstrap-neon-glow.css">
        
        <link rel="stylesheet" href="resultaat.css">
        <script>
        // Initialize and add the map
        function initMap() {
            const map = new google.maps.Map(document.getElementById("google-map-reis"), {
                zoom: 8,
                center: { lat: 52.2587, lng: 5.6054 },
                mapTypeId: "terrain",
              });

            const polyline = new google.maps.Polyline({
                path: ${JSON.stringify(reis.polyline)},
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: map
              });
        }
        </script>
    </head>
    <body>

        <div class="container">

            <div class="row">

                <div class="col">
                    <h3>Reisdetails</h3>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <tr><th scope="row">Prijs</th><td>&euro;${reis.prijs / 100}</td></tr>
                            <tr><th scope="row">Vertrekdatum</th><td>${formatteerDatum(reis.reis[0].vertrektijd)}</td></tr>
                            <tr><th scope="row">Wachttijd</th><td>${formateerTijdsduurMinuten(reis.stationstijd)}</td></tr>
                            <tr><th scope="row">Rijtijd</th><td>${formateerTijdsduurMinuten(reis.treintijd)}</td></tr>
                            <tr><th scope="row">Totale reistijd</th><td>${formateerTijdsduurMinuten(reis.reistijd)}</td></tr>
                            <tr><th scope="row">Hemelsbrede afstand</th><td>${Math.round(reis.hemelsbredeafstand)} kilometer</td></tr>
                            <tr><th scope="row">Afgelegde afstand</th><td>${Math.round(reis.afstand)} kilometer</td></tr>
                        </table>
                    </div>
                </div>

                <div class="map-container col" id="google-map-reis"></div>

                <div class="col">
                    <h3>Reisplan</h3>
                    <table class="table table-hover">
                        <th scope="col">Overstaptijd</th>
                        <th scope="col">Vertrekstation</th>
                        <th scope="col">Vertrekspoor</th>
                        <th scope="col">Vertrektijd</th>
                        <th scope="col">Product</th>
                        <th scope="col">Richting</th>
                        <th scope="col">Ritduur</th>
                        <th scope="col">Aankomsttijd</th>
                        <th scope="col">Aankomststation</th>
                        <th scope="col">Aankomstspoor</th>
                        <th scope="col">Uitstapzijde</th>
                        ${reisTabel}
                    </table>
                </div>
           
                <div class="col">
                    <h3>Bewijs links</h3>
                    <ul class="list-group">
                        ${reis.urls.map((url, index) => `<li class="list-group-item"><a class="bewijslink" href=${url} target="_blank">Bewijslink ${index + 1}</a></li>`).join("")}
                    </ul>
                </div>
                <div class="col">
                    <h3>Gepasseerde stations</h3>
                    <ul class="list-group"><li class="list-group-item">
                        ${reis.gepasseerdestations.join(`</li><li class="list-group-item">`)}
                    </li></ul>
                </div>
            </div>
        </div>

        <script async
            src="https://maps.googleapis.com/maps/api/js?key=${config.google_maps_api_key}&callback=initMap">
        </script>
    </body>
</html>

    `;
};