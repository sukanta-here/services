var express = require("express");
// const bodyParser = require("body-parser");
// var bodyParser = require('body-parser');
//Express initialization
var app = express();


// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// parse requests of content-type: application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
//   })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

require("./app/routes/employee.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
