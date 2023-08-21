// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", function(req, res) {
  var date = req.params.date
  var milliseconds = Date.parse(date);
  if (isNaN(milliseconds)) {
    milliseconds = date
  }

  var formatted_date = normal_date_to_utc_converter(milliseconds)
  res.json({ unix: Number(milliseconds), utc: formatted_date })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

function normal_date_to_utc_converter(milliseconds) {

  milliseconds = Number(milliseconds)
  var utc_date = new Date(milliseconds);
  var day = utc_date.getUTCDate();
  var month = utc_date.toLocaleString('default', { month: 'short' });
  var year = utc_date.getUTCFullYear();
  var hours = utc_date.getUTCHours();
  var minutes = utc_date.getUTCMinutes();
  var seconds = utc_date.getUTCSeconds();

  var formattedDate = day + ' ' + month + ' ' + year + ' ' +
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds + ' GMT';

  return formattedDate
}