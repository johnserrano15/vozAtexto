'use strict';

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const errorhandler = require('errorhandler');
const bluemix = require('./config/bluemix')
const watson = require('watson-developer-cloud');
const path = require('path');
const extend = require('util')._extend;

const config = {
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: 'b14179e3-ea41-4268-935f-2d3a43dcad74',
  password: 'lLAGhQmQo4ux'
};

const credentials = extend(config, bluemix.getServiceCreds('speech_to_text'));
const authorization = watson.authorization(credentials);

if (!!process.env.VCAP_SERVICES) {
  app.enable('trust proxy');
  app.use (function (req, res, next) {
    if (req.secure) {
      next();
    } 
    else {
      res.redirect('https://' + req.headers.host + req.url);
    }
  });
}

app.use(express.static(path.join(__dirname , './public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/token', function(req, res) {
  authorization.getToken({url: credentials.url}, function(err, token) {
    if (err) {
      console.log('error:', err);
      res.status(err.code);
    }
    res.send(token);
  });
});

if (!process.env.VCAP_SERVICES) {
  app.use(errorhandler());
}
var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);