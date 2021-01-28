const { default: axios } = require("axios");
const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("ac3c8073cbf2496b9690365f1b96c877");
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

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

const db = process.env.mongouri;

const connect = mongoose
  .connect(db, { useFindAndModify: false })
  .then(() => console.log("Mondo db connected...."))
  .catch((err) => console.log(err));

var contactSchema = new mongoose.Schema({
  email: String,
});

var contact = mongoose.model("contact", contactSchema);

app.post("/subscribe", async (req, res) => {
  const c = new contact({
    email: req.body.email,
  });
  await c.save();
  res.redirect("/");
});

app.get("/new", (req, res) => {
  newsapi.v2
    .topHeadlines({
      q: "vaccination",
      category: "health",
      language: "en",
      country: "in",
    })
    .then((response) => {
      console.log(response);
      res.send(response);
      /*
      {
        status: "ok",
        articles: [...]
      }
    */
    });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("working");
});
