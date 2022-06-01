"use strict";

const fs = require("fs");
const { parse } = require("csv-parse/sync");

const data = fs.readFileSync("./tools/BanshoList.csv");
const records = parse(data, {
  columns: true,
});

let jsonBulk = [];
for (let i = 0; i < records.length; i++) {
  let json = {
    name: records[i].name,
    description: records[i].description,
    image: records[i].image,
    attributes: [{ trait_type: "Artist", value: records[i].Artist }],
  };
  console.log(json);
  //console.log(records[i]);
  let stringData = JSON.stringify(json);
  fs.writeFileSync("./tools/metadata/" + records[i].id + ".json", stringData);
  jsonBulk.push({ id: records[i].id, json: json });
}

let stringData = JSON.stringify(jsonBulk);
fs.writeFileSync("./tools/metadata/bulk.json", stringData);

/*

let cols = ["", "", "", "", "", "", "", ""];
let n = 10000;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < 8; j++) {
    cols[j] = cols[j].concat(records[i][j]);
  }
}

let save = {
  colors: [cols[6], cols[2], cols[4], cols[3], cols[7]],
};

*/
/*
let stringData = JSON.stringify(save);
fs.writeFileSync("./scripts/converted.json", stringData);
*/
