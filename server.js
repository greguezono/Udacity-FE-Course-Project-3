// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000;
const server = app.listen(port, () => {console.log(`Server ${server} running on localhost: ${port}`)});

// Get method route
app.get('/get',  function (req, res) {
    res.send(projectData);
})

// Post method route
app.post('/post', function (req, res) {
    projectData = {};
    projectData['temperature'] = req.body.temperature;
    projectData['date'] = req.body.date;
    projectData['userResponse'] = req.body.userResponse;
    res.send(projectData);
})