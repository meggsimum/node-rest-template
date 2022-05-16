const express = require('express');
var bodyParser = require('body-parser');

const port = process.env.NODE_API_PORT || 8888;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(
  bodyParser.json(
    { limit: '1kb' }
  )
);

const verbose = true;

// without router
app.get('/coordinates', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  verboseLogging('LAT=', lat, 'LON=', lon);

  var returnJson = {
    lon: lon,
    lat: lat
  };

  res.status(200).json(returnJson);
});

// with router
app.route('/book')
  .get(function (req, res) {
    res.status(500).send({ error: 'something blew up' });
  })
  .post(function (req, res) {
    const requestBody = req.body;
    // forward JSON
    var reqContentType = req.headers['content-type'];
    if (reqContentType === 'application/json') {
      res.setHeader('Content-Type', 'application/json');
    }

    res.status(201).send(requestBody);
  })
  .put(function (req, res) {
    res.send('Update a book');
  })

module.exports = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

/**
 * Logs the given message, when `verbose` flag is set to true.
 *
 * @param {*} msg
 */
function verboseLogging (msg) {
  if (verbose) {
    console.log.apply(console, arguments);
  }
}
