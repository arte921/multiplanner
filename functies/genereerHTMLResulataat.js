const {
    formatteerDatum,
    formateerTijdsduurMinuten,
    vertaalZijde
 } = require("./formatters.js");

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
        </style>
    </head>
    <body>
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
    </body>
</html>

    `;
};