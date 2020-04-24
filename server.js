const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));

// Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/tracker", function (req, res) {
  let queryURL = "https://corona.lmao.ninja/v2/countries";
  axios.get(queryURL).then(function (response) {
    const covidData = response.data;
    fs.writeFile("./db/db.json", JSON.stringify(covidData), function (err) {
      if (err) throw err;
    });
    return res.json(covidData);
  });
});
