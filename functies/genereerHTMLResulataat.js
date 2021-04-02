const {
    formatteerDatum,
    formateerTijdsduurMinuten,
    vertaalZijde
 } = require("./formatters.js");


 const readJSONSync = require('./readJSONSync.js');
 const config = readJSONSync("config");

module.exports = (reis) => {
    // require("./writeJSON")(reis, "bs_reis");

    const reisTabel = reis.reis.map((reisdeel) => `
        <tr>
            <td>${formateerTijdsduurMinuten(reisdeel.overstaptijd)}</td>
            <td>${reisdeel.vertrekstationnaam}</td>
            <td>${reisdeel.vertrekspoor}</td>
            <td>${formatteerDatum(reisdeel.vertrektijd)}</td>
            <td>${reisdeel.categorie}</td>
            <td>${reisdeel.richting}</td>
            <td>${formateerTijdsduurMinuten(reisdeel.ritduur)}</td>
            <td>${formatteerDatum(reisdeel.aankomsttijd)}</td>
            <td>${reisdeel.aankomststationnaam}
            <td>${reisdeel.aankomstspoor}</td>
            <td>${vertaalZijde(reisdeel.uitstapzijde)}</td>
        </tr>
    `).join("");

    return `

<html>
    <head>
        <title>Reis van ${reis.reis[0].vertrekstationnaam} naar ${reis.reis[reis.reis.length - 1].aankomststationnaam}</title>
        <style>
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }

            th, td {
                padding: 5px;
            }

            th {
                text-align: left;
            }

            #map {
                height: 100%;
                /* The height is 400 pixels */
                width: 100%;
                /* The width is the width of the web page */
              }
        </style>
        <script>
        // Initialize and add the map
        function initMap() {
            const map = new google.maps.Map(document.getElementById("map"), {
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
        <div id="map"></div>
        <br>
        <table>
            <tr><th>Prijs</th><td>&euro;${reis.prijs / 100}</td></tr>
            <tr><th>Wachttijd</th><td>${formateerTijdsduurMinuten(reis.stationstijd)}</td></tr>
            <tr><th>Rijtijd</th><td>${formateerTijdsduurMinuten(reis.treintijd)}</td></tr>
            <tr><th>Totale reistijd</th><td>${formateerTijdsduurMinuten(reis.reistijd)}</td></tr>
            <tr><th>Hemelsbrede afstand</th><td>${Math.round(reis.hemelsbredeafstand)} kilometer</td></tr>
            <tr><th>Afgelegde afstand</th><td>${Math.round(reis.afstand)} kilometer</td></tr>
        </table>
        <br>
        <table>
            <th>Overstaptijd</th>
            <th>Vertrekstation</th>
            <th>Vertrekspoor</th>
            <th>Vertrektijd</th>
            <th>Product</th>
            <th>Richting</th>
            <th>Ritduur</th>
            <th>Aankomsttijd</th>
            <th>Aankomststation</th>
            <th>Aankomstspoor</th>
            <th>Uitstapzijde</th>
            ${reisTabel}
        </table>
        <br>
        <b>Bewijs links</b>
        <ul>
            ${reis.urls.map((url, index) => `<li><a href=${url} target="_blank">Bewijslink ${index + 1}</a></li>`).join("")}
        </ul>
        <br>
        <b>Gepasseerde stations</b>
        <ul><li>
            ${reis.gepasseerdestations.join("</li><li>")}
        </li></ul>
        <script async
            src="https://maps.googleapis.com/maps/api/js?key=${config.google_maps_api_key}&callback=initMap">
        </script>
    </body>
</html>

    `;
};