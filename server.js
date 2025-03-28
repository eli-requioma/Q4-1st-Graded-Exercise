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
  //res.render("happy", { name, gender, number,  });
  res.render("happy", {inputData, gNames});
  //create an array for happy birthday song
  const happyBday = "Happy birthday to you. Happy birthday to you. Happy birthday dear ________. Happy birthday to you!";
  const happyBdayArr = happyBday.split(" ");
  console.log(happyBdayArr);
  const combinedObj = gNames.reduce((obj, key, index) => {
    obj[key] = happyBdayArr[index % happyBdayArr.length];
    return obj;
  }, {});
  console.log(combinedObj);
});


//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
