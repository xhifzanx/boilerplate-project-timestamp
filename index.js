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
  if (date.length > 1) {
    var milliseconds = Date.parse(date);
    if (isNaN(milliseconds)) {
      milliseconds = date
    }

    var formatted_date = normal_date_to_utc_converter(milliseconds)
    if (formatted_date == 'Invalid Date') {
      res.json({ error: formatted_date })
    } else {
      res.json({ unix: Number(milliseconds), utc: formatted_date })
    }
  } else {
    var today = new Date();
    var milliseconds = Date.parse(today)
    var formatted_date = normal_date_to_utc_converter(milliseconds)
    res.json({ unix: Number(milliseconds), utc: formatted_date })
  }

})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

function normal_date_to_utc_converter(milliseconds) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  milliseconds = Number(milliseconds)
  var utc_date = new Date(milliseconds);
  console.log(utc_date)
  if (String(utc_date) != 'Invalid Date') {
    const dayOfWeek = weekdays[utc_date.getDay()]
    var day = Number(utc_date.getUTCDate()) < 10 ? `0${utc_date.getUTCDate()}` : utc_date.getUTCDate()
    var month = utc_date.toLocaleString('default', { month: 'short' });
    var year = utc_date.getUTCFullYear();
    var hours = utc_date.getUTCHours();
    var minutes = utc_date.getUTCMinutes();
    var seconds = utc_date.getUTCSeconds();

    var formattedDate = dayOfWeek + ', ' + day + ' ' + month + ' ' + year + ' ' +
      (hours < 10 ? '0' : '') + hours + ':' +
      (minutes < 10 ? '0' : '') + minutes + ':' +
      (seconds < 10 ? '0' : '') + seconds + ' GMT';

    return formattedDate
  } else {
    return 'Invalid Date'
  }


}