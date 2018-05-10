
var initSessionPermissions = require('./sessionpermissions').initSessionPermissions;
var initAnimatePanel = require('./animatepanel').initAnimatePanel;
var initShowTab = require('./showtab').initShowTab;
var initRecordButton = require('./recordbutton').initRecordButton;
var initDisplayMetadata = require('./displaymetadata').initDisplayMetadata;


exports.initViews = function(ctx) {
  console.log('Initializing views...');
  initRecordButton(ctx);
  initSessionPermissions();
  initShowTab();
  initAnimatePanel();
  initShowTab();
  initDisplayMetadata();
}
