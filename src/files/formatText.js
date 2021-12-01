function createTable(dataTable) {
    if (dataTable.length > 0 ) return `
    <html>
<head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>

<table>
  <tr>
    <th>nombre</th>
    <th>Apellido</th>
    <th>Edad</th>
    <th>tiene un vinculo consangineo?</th>
  </tr>
    ${dataTable.map((item)=>(`
      <tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
      </tr>
`))}
</table>

</body>
</html>
    `;
    return `<h3>
                No se suministro informacion sobre su entorno familiar   
            </h3>`
}

const createBody = (data) => {
    const dataTable = data.family ? data.family.map((item) => [item.name, item.lastname, item.age.toString(), item.parent.toString()]) : [];
    console.log("dataTable", dataTable);
    const body = createTable(dataTable);

    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
    </head>
    <body style="white-space:pre; font-family:monospace; width: 80%; margin: 0 auto">
        <div>   
            <h2>Informacion personal</h2>
            <p>Nombres ${data.personal.name} ${data.personal.lastname}</p>
            <p>Edad ${data.personal.age}</p>
        </div>
        <div>
        <h2>Informacion familiar</h2>
            ${body}
        </div>
    </body>
    </html>`;
}
module.exports = createBody;
