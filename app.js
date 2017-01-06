'use strict';

// Modules:
var AcuityScheduling = require('acuityscheduling');
var express = require('express');

// Create an instance of Acuity for accessing the API:
var acuity = AcuityScheduling.basic({
  "userId": process.env.ACUITY_USER_ID,
  "apiKey": process.env.ACUITY_API_KEY
});

// Create a new express server:
var app = express();
var port = process.env.ACUITY_PORT || 3000;

// Add some routes:
app.use('/', express.static('public'));
app.get('/api/classes', function (req, res) {
  acuity.request('/availability/classes?month=' + req.query.month, function (err, response) {
    if (err) {
      return console.error(err);
    }
    res.send(response.body);
  });
});

// Listen on the selected port:
app.listen(port, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Server started! Say hey at http://localhost:' + port + '/')
});
