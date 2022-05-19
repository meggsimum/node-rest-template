const express = require('express');
const helmet = require('helmet');
const pino = require('pino')

const port = process.env.NODE_API_PORT || 8888;
const app = express();

// applies basic security measures
app.use(helmet());
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ssZ',
      ignore: 'pid,hostname'
    }
  }
});

app.use(function (req, res, next) {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    req.body = data;
    next();
  });
});

// without router
app.get('/coordinates', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  logger.info(`LAT=${lat} LON=${lon}`);

  const returnJson = {
    lon,
    lat
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
    const reqContentType = req.headers['content-type'];
    if (reqContentType === 'application/json') {
      res.setHeader('Content-Type', 'application/json');
    }

    res.status(201).send(requestBody);
  })
  .put(function (req, res) {
    res.send('Update a book');
  })

module.exports = app.listen(port, () =>
  logger.info(`Example app listening on port ${port}!`)
);
