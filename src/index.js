'use strict';

var Microphone = require('./Microphone');
var utils = require('./utils');
utils.initPubSub();
var initViews = require('./views').initViews;

window.BUFFERSIZE = 8192;

$(document).ready(function() {

  utils.getToken(function(token) {

    window.onbeforeunload = function(e) {
      localStorage.clear();
    };

    if (!token) {
      console.error('Token invalido');
    }

    var viewContext = {
      currentModel: 'es-ES_BroadbandModel',
      token: token,
      bufferSize: BUFFERSIZE
    };

    initViews(viewContext);

    $.subscribe('clearscreen', function() {
      $('#resultsText').text('');
      $('#resultsJSON').text('');
      $('.error-row').hide();
      $('.notification-row').hide();
      $('.hypotheses > ul').empty();
      $('#metadataTableBody').empty();
    });

  });

});
