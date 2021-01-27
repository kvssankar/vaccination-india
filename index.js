const { default: axios } = require("axios");
const express = require("express");
const app = express();
const fs = require("fs");

// var cron = require('node-cron');

// cron.schedule('*/10 * * * *', () => {
//   console.log("Cron")
//   axios
//     .get("https://covid.ourworldindata.org/data/owid-covid-data.json")
//     .then((data) => {
//       fs.writeFile(path.join(__dirname,"/public/data1.json"), data, (err) => {
//         if (err) {
//             throw err;
//         }
//         console.log("JSON data is saved.");
//     });
//       res.send(data.data.IND);
//     })
//     .catch((err) => console.log(err));
// }, {
//   scheduled: true,
//   timezone: "Asia/Kolkata"
// });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/stats", (req, res) => {
  res.sendFile(__dirname + "/charts.html");
});

app.get("/data", (req, res) => {
  let rawdata = fs.readFileSync(__dirname + "/public/assets/data.json");
  let data = JSON.parse(rawdata);
  res.json(data);
});

app.listen(4000, () => {
  console.log("working");
});
