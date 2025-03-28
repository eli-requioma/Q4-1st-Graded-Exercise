// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index");
});

// Create express route binder for happy.hbs and get the data from the url as parameters
// that came from index.hbs
app.get("/happy", (req, res) => {
  res.render('happy');
});
//get all necessary data from index.hbs and display on happy.hbs
app.post("/happy", (req, res) => {
  //for displaying user data on the first half of webpage
  const { name, gender, number } = req.body;
  const inputData = req.body; 
  console.log('happy', { inputData });

  //create an array containing guest names
  const gNames = []; 
  for (let index = 1; index <= number; index++) {
    const currentObj = "name" + index;
    const name = inputData[currentObj];
    gNames.push(name);
  }
  console.log(gNames);

  //create an array for happy birthday song
  const happyBday = "Happy birthday to you. Happy birthday to you. Happy birthday dear ________. Happy birthday to you!";
  const happyBdayArr = happyBday.split(" ");
  const combinedHappyBday = [];

  //create an array for jolly good fellow
  const jollyGoodFellow = "For ______ a jolly good fellow. For ______ a jolly good fellow. For ______ a jolly good fellow, which nobody can deny!";
  const jollyGoodFellowArr = jollyGoodFellow.split(" ");

  //for creating combined array (guestnames and HBD lyrics)
  for (let i = 0; i <= happyBdayArr.length; i++){
    let guestIndex = i % gNames.length;
    if (i == 11) {
      combinedHappyBday.push(`${gNames[guestIndex]}: ${name}`);
    }
    else if (i == happyBdayArr.length) {
      if (gender === "female") {
        const updatedJollyGoodFellow = jollyGoodFellowArr.reduce((combine, element) => {
          if (element === "______") {
            combine.push("she's");
          }
          else {
            combine.push(element);
          }
          return combine;
        }, []);
        combinedHappyBday.push(`${gNames[guestIndex]}:`, updatedJollyGoodFellow);
      }
      else {
        const updatedJollyGoodFellow = jollyGoodFellowArr.reduce((combine, element) => {
          if (element === "______") {
            combine.push("he's");
          }
          else {
            combine.push(element);
          }
          return combine;
        }, []);
        combinedHappyBday.push(`${gNames[guestIndex]}:`, updatedJollyGoodFellow);
      }
    }
    else {
      combinedHappyBday.push(`${gNames[guestIndex]}: ${happyBdayArr[i]}`);
    }
  }

  //transfer all prepared data above into happy.hbs
  res.render("happy", {inputData, gNames, combinedHappyBday});
});


//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
