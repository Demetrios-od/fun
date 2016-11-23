function loadPageLabwork () {
  // Инициализация страницы labwork.html
  $('#imgScheme').click(schemeClick);
  $('#btnCalculate').click(btnCalculateClick);
  $('#dTabsHeader ul.tabNavigation a').click(tabNavigationClick);
  $('#dTabsHeader ul.tabNavigation a:first').click();
  $('.dParamsMainListHeader').click(dParamsMainListHeaderClick);
  $('.intableEditBox').change(editParamChange);
  $('#selCalcMode').change(selCalcModeChange);
  $('#selPropModel').change(selPropModelChange);
  showTranslatedImages();
  $('#trTxAntennaHeight, #trDistance, #trRxAntennaHeight, #dResultsLoss').hide();
};

function showTranslatedImages () {
  $('#imgScheme').prop('src', 'projects/'+currentProject+'img/rlink_'+TRg.langPrefix+'.gif');
};

function schemeClick (e) {
  var px = e.pageX - $('#imgScheme').offset().left;
  var py = e.pageY - $('#imgScheme').offset().top;
  if      (px>  1 && py>176 && px<158 && py<229) {alert(TRg.devTransmitter)}
  else if (px>161 && py>193 && px<272 && py<242) {alert(TRg.devFeederTx)}
  else if (px>628 && py>193 && px<739 && py<242) {alert(TRg.devFeederRx)}
  else if (px>266 && py>113 && px<300 && py<210) {alert(TRg.devAntennaTx)}
  else if (px>601 && py>113 && px<635 && py<210) {alert(TRg.devAntennaRx)}
  else if (px>310 && py>  4 && px<591 && py<261) {alert(TRg.devPropMedium)}
  else if (px>742 && py>176 && px<899 && py<229) {alert(TRg.devReceiver)};
};

function tabNavigationClick() {
  // Выполняется при клике на ярлыке вкладки.
  // Переключает вкладку, очищает все поля на выбранной вкладке.

  if ($(this).hasClass('selected')) {return false};
  $('#dTabs > div').hide().filter(this.hash).show();
  $('#dTabsHeader ul.tabNavigation a').removeClass('selected');
  $(this).addClass('selected');
  switch (this.hash) {
    case '#dModelingTab':
      // what to do if the page is chosen
      break;
    case '#dHelpTab':
      // what to do if the page is chosen
      break;
  };
  return false;
};

//-------------- Обработка событий страницы --------------

function btnCalculateClick () {
  var PRECISION = 3;
  var PTx  = +$('#ipPower').val();            // dBm
  var f    = +$('#ipFrequency').val()*1e6;    // Hz
  var LfTx = +$('#ipTxFeederLoss').val();     // dB
  var GTx  = +$('#ipTxAntennaGain').val();    // dB
  var hTx  = +$('#ipTxAntennaHeight').val();  // m
  var r    = +$('#ipDistance').val()*1000;    // m
  var SRx  = +$('#ipSensitivity').val();      // dBm
  var LfRx = +$('#ipRxFeederLoss').val();     // dB
  var GRx  = +$('#ipRxAntennaGain').val();    // dB
  var hRx  = +$('#ipRxAntennaHeight').val();  // m

  var proploss;
  switch ($('#selPropModel').val()) {
    case 'freespace': proploss = freeSpaceLoss; propdist = freeSpaceDistance; break;
    case 'doubleway': proploss = doubleWayLoss; propdist = doubleWayDistance; break;
    case 'ohata':     proploss = ohataLoss;     propdist = ohataDistance;
  };
  switch ($('#selCalcMode').val()) {
    case 'distance':
      r = propdist({L: PTx-SRx+GTx+GRx-LfTx-LfRx, f: f})/1000;
      $('#lbMaxDistance').text(r.toPrecision(PRECISION));
      break;
    case 'loss':
      var L = proploss({r: r, f: f});
      var PRx = PTx+GTx+GRx-LfTx-LfRx-L;
      var isGoodQuality = (PRx>SRx)? '': TRg.lbNot;
      $('#lbInputPower').text(PRx.toPrecision(PRECISION));
      $('#lbPropLoss').text(L.toPrecision(PRECISION));
      $('#lbNot').text(isGoodQuality);
  };
  $('.intableEditBox').removeClass('intableEditBoxChanged');
};

// all loss in dB, other data in SI system

function freeSpaceLoss (p) {
  // p.r - расстояние, м
  // p.f - частота, Гц
  return 20*log10(4*Math.PI*p.r*p.f/3e8);
};

function freeSpaceDistance (p) {
  // p.f - частота, Гц
  // p.L - затухание, дБ
  return 3e8*Math.pow(10, p.L/20)/(4*Math.PI*p.f);
};

function doubleWayLoss (p) {
  return 0;
};

function doubleWayDistance (p) {
  return 0;
};

function ohataLoss (p) {
  return 0;
};

function ohataDistance (p) {
  return 0;
};

function dParamsMainListHeaderClick () {
  $(this).next().slideToggle();
};

function editParamChange () {
  // цвет изменить, если число изменилось
  $(this).addClass('intableEditBoxChanged');
};

function selCalcModeChange () {
  switch ($('#selCalcMode').val()) {
    case 'distance':
      $('#trDistance, #dResultsLoss').hide();
      $('#dResultsDist').show();
      $('#lbMaxDistance').text(0);
      break;
    case 'loss':
      $('#trDistance, #dResultsLoss').show();
      $('#lbInputPower').text(0);
      $('#lbPropLoss').text(0);
      $('#lbNot').text('');
      $('#dResultsDist').hide();
  };
};

function selPropModelChange () {
  switch ($('#selPropModel').val()) {
    case 'freespace':
      $('#trTxAntennaHeight, #trRxAntennaHeight').hide();
      break;
    case 'doubleway':
    case 'ohata':
      $('#trTxAntennaHeight, #trRxAntennaHeight').show();
  };
};

