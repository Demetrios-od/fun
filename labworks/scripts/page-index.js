/* Common operations for index.html */

var hometaskIsSolved;
var currentPage;
var funcToLoad;
var TRx, RLink;
setInitialState();
var TRg = {
  langPrefix: 'ru'
};
var currentProject = 'trx/';

function setInitialState () {
  hometaskIsSolved = false;
  currentPage = 'first.html';  // must be "first.html"
  funcToLoad = function () {};
  TRx = undefined;
  RLink = undefined;
};

$(function () {
  /* Инициализация страницы - выполняется при загрузке */
  $.getScript('projects/'+currentProject+'scripts/page-homework.js');
  $.getScript('projects/'+currentProject+'scripts/page-labwork.js');
  $('#dHeader').load('includes/header.html', loadPageHeader);
  $('#dFooter').load('includes/footer.html');
  $('#dContent').load('projects/'+currentProject+TRg.langPrefix+'/'+currentPage);
});

function showPopupWindow (filename) {
  $('#dBlocker').show();
  $('body').append('<div id="dPopup" class="devDescription"><div id="dPopupPageMenu"><img src="images/close.png" width="25" height="25" onclick="hidePopupWindow()"></div><div id="dPopupClient"></div></div>');
  $('#dPopupClient').load(filename, function () {
    $('.innerParamsHead').click(function (){$('.innerParamsBody').slideToggle()});
  });
  var x = ( document.documentElement.clientWidth - $('#dPopup').width() )/2;
  var y = $('document').scrollTop();
  $('#dPopup').offset({top: y, left: x});
};

function hidePopupWindow () {
  $('#dPopup').remove();
  $('#dBlocker').hide();
};
