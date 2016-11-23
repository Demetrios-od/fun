function loadPageLabwork () {
  // Инициализация страницы labwork.html
  $('#imgScheme').click(schemeClick);
  $('#btnCalculate').click(btnCalculateClick);
  $('#btnShowSignal').click(btnShowSignalClick);
  $('#dTabsHeader ul.tabNavigation a').click(tabNavigationClick);
  $('#dTabsHeader ul.tabNavigation a:first').click();
  $('.dParamsMainListHeader').click(dParamsMainListHeaderClick);
  $('.intableEditBox').change(editParamChange);
  $('#selSignalToShow').change(btnShowSignalClick);

  // Создаем схему
  TRx = new Scheme();

  // Создаём устройства
  TRx.addDevice('BitSource',       0, 1, generateBits, {Br: 270833});  // Br - скорость передачи данных, бит/с
  TRx.addDevice('GaussFilter',     1, 1, gaussFiltering, {BT: 0.3});   // BT - параметр GMSK
  TRx.addDevice('Modulator',       2, 1, modulating);
  TRx.addDevice('FreqSyntTx',      0, 3, generateFreqTx);
  TRx.addDevice('TConvertor1',     2, 1, freqConversion, {mode: 'up'});
  TRx.addDevice('TConvertor2',     2, 1, freqConversion, {mode: 'up'});
  TRx.addDevice('PowerAmplifier',  1, 1, amplification);
  TRx.addDevice('RadioLink',       1, 2, radioPropagation);  // должен быть один выход
  TRx.addDevice('LNA',             1, 1, amplification);
  TRx.addDevice('FreqSyntRx',      0, 4, generateFreqRx);
  TRx.addDevice('RConvertor1',     2, 1, freqConversion, {mode: 'down'});
  TRx.addDevice('IFA',             1, 1, amplification);
  TRx.addDevice('RConvertor2',     2, 1, freqConversion, {mode: 'down'});
  TRx.addDevice('Demodulator',     4, 1, demodulating);  // должно быть два входа
  TRx.addDevice('SolvingDevice',   2, 1, solvingBits);

  // Создаём связи между устройствами
  TRx.setLink('BitSource',       0, 'GaussFilter',    0);
  TRx.setLink('GaussFilter',     0, 'Modulator',      0);
  TRx.setLink('FreqSyntTx',      0, 'Modulator',      1);
  //TRx.setLink('Modulator',       0, 'Demodulator',    0);   // для отладки
  TRx.setLink('Modulator',       0, 'TConvertor1',    0);
  TRx.setLink('FreqSyntTx',      1, 'TConvertor1',    1);
  TRx.setLink('TConvertor1',     0, 'TConvertor2',    0);
  TRx.setLink('FreqSyntTx',      2, 'TConvertor2',    1);
  TRx.setLink('TConvertor2',     0, 'PowerAmplifier', 0);
  TRx.setLink('PowerAmplifier',  0, 'RadioLink',      0);
  TRx.setLink('RadioLink',       0, 'LNA',            0);
  TRx.setLink('LNA',             0, 'RConvertor1',    0);
  TRx.setLink('FreqSyntRx',      0, 'RConvertor1',    1);
  TRx.setLink('RConvertor1',     0, 'IFA',            0);
  TRx.setLink('IFA',             0, 'RConvertor2',    0);
  TRx.setLink('FreqSyntRx',      1, 'RConvertor2',    1);
  TRx.setLink('RConvertor2',     0, 'Demodulator',    0);
  TRx.setLink('FreqSyntRx',      2, 'Demodulator',    1);
  TRx.setLink('RadioLink',       1, 'Demodulator',    2);  // hack
  TRx.setLink('GaussFilter',     0, 'Demodulator',    3);  // hack
  TRx.setLink('Demodulator',     0, 'SolvingDevice',  0);
  TRx.setLink('FreqSyntRx',      3, 'SolvingDevice',  1);

  TRx.onFinish = hidePopupWindow;
  showTranslatedImages();
};

function showTranslatedImages () {
  $('#imgScheme').prop('src', 'projects/'+currentProject+'img/trx_'+TRg.langPrefix+'.gif');
};

function schemeClick (e) {
  var px = e.pageX - $('#imgScheme').offset().left;
  var py = e.pageY - $('#imgScheme').offset().top;
  if      (px>161 && py> 66 && px<227 && py<117) {alert(TRg.devInBitStream)}
  else if (px>254 && py> 66 && px<320 && py<117) {alert(TRg.devGaussFilter)}
  else if (px>348 && py> 66 && px<414 && py<117) {alert(TRg.devModulator)}
  else if (px>441 && py> 66 && px<507 && py<117) {alert(TRg.devFC1Tx)}
  else if (px>534 && py> 66 && px<600 && py<117) {alert(TRg.devFC2Tx)}
  else if (px>626 && py> 66 && px<692 && py<117) {alert(TRg.devPowerAmp)}
  else if (px>720 && py> 66 && px<786 && py<117) {alert(TRg.devBandpassFilter)}
  else if (px>793 && py>  4 && px<834 && py<102) {alert(TRg.devAntennaTx)}
  else if (px>729 && py>139 && px<816 && py<178) {alert(TRg.devNoise)}
  else if (px>836 && py>  0 && px<900 && py<278) {alert(TRg.devPropMedium)}
  else if (px>793 && py>217 && px<834 && py<315) {alert(TRg.devAntennaRx)}
  else if (px>722 && py>280 && px<788 && py<331) {alert(TRg.devPreselector)}
  else if (px>628 && py>280 && px<694 && py<331) {alert(TRg.devLNA)}
  else if (px>536 && py>280 && px<602 && py<331) {alert(TRg.devFC1Rx)}
  else if (px>442 && py>280 && px<508 && py<331) {alert(TRg.devIFA)}
  else if (px>349 && py>280 && px<415 && py<331) {alert(TRg.devFC2Rx)}
  else if (px>255 && py>280 && px<321 && py<331) {alert(TRg.devDemodulator)}
  else if (px>161 && py>280 && px<227 && py<331) {alert(TRg.devSolvingDevice)}
  else if (px> 11 && py>312 && px<153 && py<365) {alert(TRg.devOutBitStream)}
  else if (px>254 && py>147 && px<320 && py<198) {alert(TRg.devFSTx)}
  else if (px>442 && py>360 && px<508 && py<411) {showPopupWindow('projects/'+currentProject+TRg.langPrefix+'/devices/freqsynt.html')};
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

//--------------- Функции устройств ---------------

function generateBits (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
    TRx.samplingFreq - часота дискретизации, Гц. Задаётся при чтении исходных данных из формы.
    params.Br - скорость следования бит на выходе генератора. Задаётся при создании устройства.
    params.Nbits - число генерируемых бит. Задаётся при чтении исходных данных.
  */

  // сколько отсчетов на один входной бит
  TRx.factor = Math.round(TRx.samplingFreq/params.Br);
  TRx.samplingFreq = params.Br*TRx.factor;
  var fd = TRx.samplingFreq/1e6;
  $('#ipSampleFreq').val(fd.toPrecision(3));

  // определяем входной сигнал
  var initdata = [];
  var isum = 0;
  if (params.turnedOn) {
    for (var i=0; i<params.Nbits; i++) {
      initdata[i] = 2*Math.round(Math.random())-1;
      isum += initdata[i];
      // надо сделать так, чтобы число единиц и нулей было одинаковым
      if (params.Nbits-1-i < Math.abs(isum)) {
        isum -= 2*initdata[i];
        initdata[i] *= -1;
      };
    };
  } else {     // отключенный входной сигнал
    for (var i=0; i<params.Nbits; i++) {
      initdata[i] = 0;
    };
  };

  // последовательность отсчетов входного сигнала
  return [{
    value: expand(initdata, TRx.factor),
    limits: {
      min: 0,
      max: params.Nbits*1e6/TRx.samplingFreq},
    unit: "us"
  }];
};

function gaussFiltering (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
    TRx.factor - сколько отсчётов на один бит. Вычисляется в генераторе бит.
    params.LGauss - задержка в гауссовском фильтре, бит. Задаётся при чтении исходных данных.
    params.BT - коэффициент сглаживания GMSK. Задаётся при создании устройства.
  */

  // генерируем нормированный гауссовский импульс
  var gp = gaussPulse(params.LGauss, TRx.factor, params.BT);
  // находим сигнал на выходе гауссовского фильтра
  return [{
    value: conv(signals[0].value, gp),
    //limits: signals[0].limits,
    limits: {
      min: signals[0].limits.min - params.LGauss*1e6/TRx.samplingFreq,
      max: signals[0].limits.max + params.LGauss*1e6/TRx.samplingFreq,
    },
    unit: signals[0].unit
  }];
};

function modulating (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
    TRx.factor - сколько отсчётов на один бит. Вычисляется в генераторе бит.
    TRx.samplingFreq - часота дискретизации, Гц. Задаётся при чтении исходных данных.
  */

  // MSK модуляция
  // интегрируем входной сигнал, и умножаем на девиацию частоты
  var N = signals[0].value.length;
  var i;
  var s = 0;    // интеграл от входного сигнала
  var Ict = [1];
  var Qct = [0];     // синфазная и квадратурная составляющие
  for (i=1; i<N; i++) {
    s += signals[0].value[i]/TRx.factor * Math.PI/2; //*Br;
    Ict[i] = Math.cos(s);
    Qct[i] = Math.sin(s);
  };
  // Теперь надо умножить Ic на cos(w0t), а Qc на -sin(w0t).
  // Умножение сигналов во временной области - это свертка их спектров
  var Icf = dft(Ict);
  var Qcf = dft(Qct);

  // формируем спектр синусоиды и косинусоиды, они состоят из одной составляющей
  var zs = new Complex(0, 0);
  var cosw0t = [];
  var sinw0t = [];
  for (i=0; i<N; i++) {
    cosw0t[i] = zs;
    sinw0t[i] = zs;
  };
  // Расположим единственную составляющую спектра посередине массива
  i = Math.round(N/2);
  //i = N-1;
  cosw0t[i] = new Complex(1, 0);
  sinw0t[i] = new Complex(0, -1);

  // выполняем свертку комплексных спектров
  var pIcf = cyconvcompl(Icf, cosw0t);
  var pQcf = cyconvcompl(Qcf, sinw0t);
  // суммируем синфазную и квадратурную составляющие,
  // получаем комплексный спектр модулированного сигнала
  s = [];
  for (i=0; i<N; i++) {
    s[i] = pIcf[i].plus(pQcf[i]);
  };

  // signals[1].value - опорная частота модулятора
  return [{
    value: s,
    limits: {
      min: (signals[1].value - TRx.samplingFreq/2)/1e6,
      max: (signals[1].value + TRx.samplingFreq/2)/1e6
    },
    unit: 'MHz'
  }];
};

function generateFreqTx (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
    params.toModulator - частота, подаваемая на модулятор.
    params.toFC1Tx - на первый преобразователь частоты (ПЧ) в передатчике.
    params.toFC2Tx - на второй ПЧ в передатчике.
      Все частоты в герцах, задаются при чтении исходных данных.
  */

  return [
    {  // to modulator
      value: params.toModulator,
      limits: {min: params.toModulator, max: params.toModulator},
      unit: 'Hz'
    },
    {  // to 1st FC in transceiver
      value: params.toFC1Tx,
      limits: {min: params.toFC1Tx, max: params.toFC1Tx},
      unit: 'Hz'
    },
    {  // to 2nd FC in transceiver
      value: params.toFC2Tx,
      limits: {min: params.toFC2Tx, max: params.toFC2Tx},
      unit: 'Hz'
    }
  ];
};

function generateFreqRx (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
    params.toFC1Rx - на первый ПЧ в приёмнике (ближе к антенне).
    params.toFC2Rx - на второй ПЧ в приёмнике (ближе к демодулятору).
    params.toDemodulator - на демодулятор.
    params.toSolvingDevice - частота тактовых импульсов, подаваемых на решающее устройство
      Все частоты в герцах, задаются при чтении исходных данных.
  */

  return [
    {  // to 1st FC in receiver
      value: params.toFC1Rx,
      limits: {min: params.toFC1Rx, max: params.toFC1Rx},
      unit: 'Hz'
    },
    {  // to 2nd FC in receiver
      value: params.toFC2Rx,
      limits: {min: params.toFC2Rx, max: params.toFC2Rx},
      unit: 'Hz'
    },
    {  // to Modulator
      value: params.toDemodulator,
      limits: {min: params.toDemodulator, max: params.toDemodulator},
      unit: 'Hz'
    },
    {  // to Modulator
      value: params.toSolvingDevice,
      limits: {min: params.toSolvingDevice, max: params.toSolvingDevice},
      unit: 'Hz'
    }
  ];
};

function freqConversion (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
    params.mode - режим работы. params.mode = 'down' если вниз, любое другое значение - если вверх.
      Задаётся при создании устройства.
  */

  // Перенесение по спектру выполняется изменением шкалы по оси абсцисс
  // signals[1].value - частота гетеродина, Гц
  var p = (params.mode == 'down')? -signals[1].value/1e6 : signals[1].value/1e6;
  return [{
    value: signals[0].value,
    limits: {
      min: signals[0].limits.min + p,
      max: signals[0].limits.max + p,
    },
    unit: signals[0].unit
  }];
};

function radioPropagation (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
    TRx.carrierFreq - несущая частота в радиоканале, Гц.
    params.distance - расстояние от передатчика до приёмника, м.
    params.propn - коэффициент затухания n по модели РРВ r^-n, дБ/декаду
    params.GainTx - коэффициент усиления передающей антенны, дБ.
    params.GainRx - коэффициент усиления приёмной антенны, дБ.
    params.N0 - СПМ шума в радиоканале, Вт/Гц.
      Все параметры читаются из исходных данных.
    (hack) params.signalPower - КУ УМ передатчика, дБ = мощность немодулированного сигнала на входе, дБВт
  */

  // в канале связи происходит ослабление сигнала и прибавляется белый шум
  function radioPropModelLoss (r, f, n) {
    // r - расстояние (м);  f - частота (Гц);  n - модель РРВ r^-gam, дБ/декаду
    return 20*log10(4*Math.PI*f/3e8) + n*log10(r);        // результат в дБ
  };

  var L = radioPropModelLoss (params.distance, TRx.carrierFreq, params.propn);
  var G = params.GainTx + params.GainRx - L;
  s = [];
  for (i=0; i<signals[0].value.length; i++) {
    s[i] = signals[0].value[i].mul(dB2times(G)).plus((Math.random()-0.5)*params.N0);
  };
  return [{
      value: s,
      limits: signals[0].limits,
      unit: signals[0].unit
    },
    {   // hack
      value: dB2times(params.signalPower + G),   // Watt
      limits: {},
      unit: ''
    }
  ];
};

function amplification (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
    params.gain - коэффициент усиления, дБ. Читается из исходных данных.
  */

  // Усиление - умножение каждой составляющей на коэффициент усиления
  var s = [];
  var G = dB2times(params.gain);
  for (i=0; i<signals[0].value.length; i++) {
    s[i] = signals[0].value[i].mul(G);
  };
  return [{
    value: s,
    limits: signals[0].limits,
    unit: signals[0].unit
  }];
};

function demodulating (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
  */

/*
  // signals[0].value - массив отсчетов спектра модулированного сигнала
  // signals[1].value - опорная частота (число)
  var N = signals[0].value.length;

  // умножаем входной сигнал на cos(w0t) и на sin(w0t)
  // формируем спектр синусоиды и косинусоиды, они состоят из одной составляющей
  var zs = new Complex(0, 0);
  var cosw0t = [];
  var sinw0t = [];
  for (i=0; i<N; i++) {
    cosw0t[i] = zs;
    sinw0t[i] = zs;
  };
  // Расположим единственную составляющую спектра посередине массива
  // (если опорная частота задана правильно)
  i = Math.round(N/2);
  //i = N-1;
  cosw0t[i] = new Complex(1, 0);
  sinw0t[i] = new Complex(0, -1);

  // выполняем свертку комплексных спектров и ОПФ
  var Icf = cyconvcompl(signals[0].value, cosw0t);
  var Qcf = cyconvcompl(signals[0].value, sinw0t);
  var It = idft(Icf);
  var Qt = idft(Qcf);

  var s = [];
  for (var i=0; i<N; i++) {
    s[i] = It[i].abs();
  };
  return [{
    value: s,
    limits: {
      min: 0,
      max: 10
    },
    unit: 'us'
  }];
*/

//=============== Это надо переделать по-честному ===============

  /*
  Параметры, которые необходимо передать в эту функцию:
    noisePower - мощность шума
  */

  // signals[2].value - мощность полезного сигнала на выходе радиоканала
  // signals[3].value - с выхода гауссовского фильтра
  var fmid = (signals[0].limits.min + signals[0].limits.max)/2;
  var s = [];
  if (isEqualToDigits(fmid, signals[1].value/1e6, 3)) {
    var Unoise = Math.sqrt(params.noisePower/signals[2].value);   // напряжение шума (нормир.)
    for (var i=0; i<signals[3].value.length; i++) {
      s[i] = signals[3].value[i] + Unoise*(Math.random()-0.5);
    };
  };

  return [{
    value: s,
    limits: signals[3].limits,
    unit: signals[3].unit
  }];
};

function solvingBits (signals, params) {
  /*
  Параметры, которые необходимо передать в эту функцию:
    TRx.factor
    params.LGauss
  */
  var i = Math.round(TRx.factor/2)+params.LGauss*TRx.factor;
  var j = 0;
  var s = [];
  while (i < signals[0].value.length-params.LGauss*TRx.factor) {
    s[j] = (signals[0].value[i] > 0)? 1 : -1;   // метод однократного отсчёта
    i += TRx.factor;
    j++;
  };
  return [{
    value: expand(s, TRx.factor),
    //limits: signals[0].limits,
    limits: {
      min: signals[0].limits.min + params.LGauss*1e6/TRx.samplingFreq,
      max: signals[0].limits.max - params.LGauss*1e6/TRx.samplingFreq
    },
    unit: signals[0].unit
  }];
};

//-------------- Обработка событий страницы --------------

function btnCalculateClick () {
  var LGauss = 7;   // длина "хвоста" гауссовского импульса, бит
  // читаем из полей ввода параметры элементов схемы
  var Nbits = +$('#ipNumberOfBits').val();     // количество передаваемых бит
  if (Nbits <= 0) Nbits = 0;
  if (mod(Nbits, 2) == 1) Nbits += 1;
  $('#ipNumberOfBits').val(Nbits);
  TRx.samplingFreq = +$('#ipSampleFreq').val()*1e6;   // частота дискретизации, Гц (=fd)
  var tmod = +$('#ipFreqToModulator').val()*1e6;
  var tfc1 = +$('#ipFreqToFC1Tx').val()*1e6;
  var tfc2 = +$('#ipFreqToFC2Tx').val()*1e6;
  TRx.carrierFreq = tmod+tfc1+tfc2;
  var gainPA = +$('#ipPAGain').val();     // КУ УМ передатчика, дБ
  var gainLNA = +$('#ipLNAGain').val();         // КУ МШУ, дБ
  var nfLNA   = +$('#ipLNANoiseFactor').val();  // коэффициент шума МШУ, дБ
  var gainIFA = +$('#ipIFAGain').val();         // КУ УПЧ, дБ
  var nfIFA   = +$('#ipIFANoiseFactor').val();  // коэффициент шума УПЧ, дБ
  var tempLNA = +$('#ipLNATemperature').val() + 273.15;
  var bandRx = +$('#ipIFBandwidth').val()*1e6;
  var N0 = +$('#ipSND').val();      // СПМ шума в радиоканале, Вт/Гц

  TRx.setDeviceParams('FreqSyntTx', {
    toModulator: tmod,
    toFC1Tx: tfc1,
    toFC2Tx: tfc2,
  });
  TRx.setDeviceParams('FreqSyntRx', {
    toFC1Rx: +$('#ipFreqToFC1Rx').val()*1e6,
    toFC2Rx: +$('#ipFreqToFC2Rx').val()*1e6,
    toDemodulator: +$('#ipFreqToDemodulator').val()*1e6,
    toSolvingDevice: +$('#ipFreqToSolvingDevice').val()*1e6
  });
  TRx.setDeviceParams('BitSource', {
    turnedOn: $('#selSourceState').val() == 'swon',
    Nbits: Nbits
  });
  TRx.setDeviceParams('GaussFilter', {
    LGauss: LGauss
  });
  TRx.setDeviceParams('PowerAmplifier', {
    gain: gainPA
  });
  TRx.setDeviceParams('RadioLink', {
    distance: +$('#ipDistance').val()*1000, // расстояние от передатчика до приёмника, м
    propn: +$('#ipPropFactor').val(),       // коэффициент затухания по модели r^-n, дБ/декаду
    GainTx: +$('#ipTXGain').val(),     // КУ антенны передатчика, дБ
    GainRx: +$('#ipRXGain').val(),       // КУ антенны приёмника, дБ
    N0: N0,
    signalPower: gainPA   // hack
  });
  TRx.setDeviceParams('LNA', {
    gain: gainLNA,
    noiseFactor: nfLNA,
    temperature: tempLNA
  });
  TRx.setDeviceParams('IFA', {
    gain: gainIFA,
    noiseFactor: nfIFA,
    bandwidth: bandRx
  });
  TRx.setDeviceParams('Demodulator', {
    noisePower: 1.38e-23*tempLNA*bandRx*(dB2times(nfLNA) + (dB2times(nfIFA)-1)/dB2times(gainLNA) -1) +
      bandRx * N0,
    gainRx: gainLNA*gainIFA
  });
  TRx.setDeviceParams('SolvingDevice', {
    LGauss: LGauss
  });

  $('#dBlocker').show();
  $('body').append('<div id="dPopup" class="waitmessage"><p>'+TRg.processingScheme+'</p></div>');
  var x = ( document.documentElement.clientWidth - $('#dPopup').width() )/2;
  var y = $('document').scrollTop();
  $('#dPopup').offset({top: y, left: x});

  // выполняем схему
  setTimeout(function(){
    TRx.run();
    $('.intableEditBox').removeClass('intableEditBoxChanged');
    btnShowSignalClick();
  }, 50);
};

function btnShowSignalClick () {
  var i, lims;
  var pt = $('#selSignalToShow').val();
  var sig = TRx.getSignal(pt, 0);
  var data = [];
  if (sig) {
    lims = sig.limits;
    var dx = (lims.max - lims.min)/sig.value.length;
    if (~sig.unit.indexOf('Hz')) {
      // если есть "Hz" - значит это комплексный спектр
      // и график надо строить в децибелах
      for (i=0; i<sig.value.length; i++) {
        data[i] = [lims.min+i*dx, 10*log10(sig.value[i].abs())];
      };
    } else {
      // а если нет - то в разах
      for (i=0; i<sig.value.length; i++) {
        data[i] = [lims.min+i*dx, sig.value[i]];
      };
    };
    var sig1 = {
      color: '#000000',
      data: data,
      lines: {show: true},
      points: {show: false},
      xaxis: lims
    };
    $('#dGraph').plot([sig1]);

    if (pt == 'SolvingDevice') {
      var indata = [];
      var s = TRx.getSignal('BitSource', 0);
      for (i=0; i<s.value.length; i++) {
        indata[i] = [lims.min+i*dx, s.value[i]+2.5];
      };
      var sig2 = {
        color: '#ff0000',
        data: indata,
        lines: {show: true},
        points: {show: false},
        xaxis: lims
      };
      $('#dGraph').plot([sig1, sig2]);
    };

  };
};

function dParamsMainListHeaderClick () {
  $(this).next().slideToggle();
};

function editParamChange () {
  // цвет изменить, если число изменилось
  $(this).addClass('intableEditBoxChanged');
};

