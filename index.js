// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  if (!isNaN(Number(date)) && date.length === 13) {
    return res.json({
      unix: parseInt(date),
      utc: new Date(Number(date)).toUTCString()
    });
  } // ini getTime()

  if(new Date(date).toUTCString() !== 'Invalid Date') {
    return res.json({
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString(),
    }) 
  } // ini date

  res.json({ error : "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + 3000);
});
