const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../node_modules/flexmonster/flexmonster.full.js');
const key = process.env.LICENSE_KEY;

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const modifiedData = `${data}\nwindow["flexmonsterpivottablekey"]="${key}";`;

  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Environmental variable ${key} written to file successfully.`);
  });
});