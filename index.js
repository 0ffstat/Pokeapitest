const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { json } = require("express");


const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //for bodyParser. No longer needed?
app.use(express.static(__dirname)); // So sent html files can access static resources i.e. css stylesheets and images

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirName + "/index.html");
});

app.post("/", function (req, res) {
  function generateID(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateURL() {
    randID = generateID(1, 150);
    var url = "https://pokeapi.co/api/v2/pokemon-form/" + randID;
    return url;
  }

  async function getPokeData() {
    const newURL = generateURL();
    try {
      var res = await fetch(newURL);
      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }

  async function displayPokeName() {
    var data = await getPokeData();
    try {
      var pokeName = data.name;
      var spriteLink = data.sprites.front_default;
         console.log(data.name); //works
      return await [pokeName, spriteLink];
    } catch (e) {
      console.log(e);
    }
  }

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

  async function main() {
    var pokeData1 = await displayPokeName(); //dosent work. function dosent return pokeName FIXED by putting them inside ASYNC function main()
    var pokeData2 = await displayPokeName();
    pokeName1 = pokeData1[0];
    pokeName2 = pokeData2[0];
    pokePic1 = pokeData1[1];
    pokePic2 = pokeData2[1];
    pokeName1 = capitalizeFirstLetter(pokeName1);
    pokeName2 = capitalizeFirstLetter(pokeName2);


    res.write('<head> <meta charset ="utf-8"> </head><link rel="stylesheet" href="styles.css" />');
    res.write("<h1>Fight!</h1>");
    res.write("<div class='container'><h2>"+pokeName1+" vs. " +pokeName2+ "!</h2></div>");
    res.write("<img src="+pokePic1+" alt='Pokemon One'>");
    res.write("<img src="+pokePic2+" alt='Pokemon Two'>");
    res.write("<hr>");
    res.write("<button class='fight' type='button'>GO!</button");
    res.write("<script src='scripts.js'></script>");

    res.send();
  }

  main();


});

module.exports = app; //For hosting on DETA
