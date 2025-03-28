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

//Sets a basic route

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index");
});

// Create express route binder for draw.hbs and get the data from the url as parameters
// that came from index.hbs

app.get("/happy", (req, res) => {
  res.render('happy');
});

app.post("/happy", (req, res) => {
  console.log(req.body);
  const { name, gender, number } = req.body;
  const inputData = req.body;
  const gNames = []; //create an array containing guest names
  for (let index = 1; index <= number; index++) {
    const currentObj = "name" + index;
    const name = inputData[currentObj];
    gNames.push(name);
  }
  console.log(gNames);
  console.log('happy', { inputData });
  //create an array for happy birthday song
  const happyBday = "Happy birthday to you. Happy birthday to you. Happy birthday dear ________. Happy birthday to you!";
  const happyBdayArr = happyBday.split(" ");
  console.log(happyBdayArr);
  const combinedHappyBday = [];
  const jollyGoodFellow = "For ______ a jolly good fellow. For ______ a jolly good fellow. For ______ a jolly good fellow, which nobody can deny!";
  const jollyGoodFellowArr = jollyGoodFellow.split(" ");
  console.log(jollyGoodFellowArr);
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
  
  /*const combinedObj = gNames.reduce((obj, key, index) => {
    obj[key] = happyBdayArr[index % happyBdayArr.length];
    return obj;
  }, {});
  console.log(combinedObj);*/
  console.log(combinedHappyBday);
  res.render("happy", {inputData, gNames, combinedHappyBday});
});


//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
