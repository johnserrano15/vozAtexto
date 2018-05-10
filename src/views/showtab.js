
'use strict';

exports.initShowTab = function() {

  $('.nav-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).text();
    if (target === 'JSON') {
      console.log('showing json');
      $.publish('showjson');
    }
  });

}