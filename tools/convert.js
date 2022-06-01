'use strict';

const fs = require('fs');
const xlsx = require('xlsx');

let fname = process.argv[2];
let workbook = xlsx.readFile(fname);

console.log(workbook.SheetNames[0]);

let ws = workbook.Sheets[workbook.SheetNames[0]];

let json = xlsx.utils.sheet_to_json(ws);
//console.log(json);

let jsonBulk = [];
for (let i = 0; i < json.length; i++) {
  let out = {
    name: json[i].Name,
    description: json[i].Description.replace(/\r/g, ''),
    image: json[i].Image,
    //attributes: [{ trait_type: 'Artist', value: json[i].Artist }],
  };
  console.log(out);
  let stringData = JSON.stringify(out);
  fs.writeFileSync('./tools/metadata/' + json[i].ID.toFixed() + '.json', stringData);
  jsonBulk.push({ id: json[i].ID, json: out });
}

//let stringData = JSON.stringify(jsonBulk);
//fs.writeFileSync('./tools/metadata/bulk.json', stringData);
