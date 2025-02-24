// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/1451001600000", function (req, res) {
  const date = "2015-12-25";
  const newDate = new Date(date);
  const utcDate = newDate.toUTCString();
  const unixDate = newDate.getTime();
  res.json({unix: unixDate, utc: utcDate});
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  if (date) {
    const newDate = new Date(date);
    const utcDate = newDate.toUTCString();
    const unixDate = newDate.getTime();
    if (!isNaN(unixDate)) res.json({unix: unixDate, utc: utcDate});
    else res.json({error: "Invalid Date"});

  }else{
    const newDate = new Date();
    const utcDate = newDate.toUTCString();
    const unixDate = newDate.getTime();
    res.json({unix: unixDate, utc: utcDate});
  }
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
