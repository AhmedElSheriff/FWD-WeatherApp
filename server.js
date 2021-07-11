// Setup empty JS object to act as endpoint for all routes
projectData = {};
const bodyParser = require('body-parser');

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors({origin: 'http://localhost:8000'}));

// Fetch require
const fetch = require("node-fetch");

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;


// Run server
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

//Variables
const API_KEY = "22d5faca3063061017d034c09875208a";
const data = [];


app.get('/all', (req, res) => {
  
  res.send(projectData);
 
});

app.post('/addWeatherData', (req, res) => {

  console.log(req.body);
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.content = req.body.content;

});

