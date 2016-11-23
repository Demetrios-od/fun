function loadPageHomework () {
  // Инициализация страницы homework.html
  $('#btnCheckHometask').click(btnCheckHometaskClick);
};

function btnCheckHometaskClick () {
  /* Нажатие на кнопку "Проверить результат" */

  // constants
  var K_BOLT = 1.38e-23;
  var DEC_RND = 1;
  // input data
  var Df = +$('#ipFreqBand').val();     // МГц
  var k  = +$('#ipNoiseFactor').val();  // дБ
  var T0 = +$('#ipTempRec').val();      // К
  // answers to hometask
  var N0 = +$('#ipSND').val();            // Вт/Гц
  var Pn = +$('#ipRecNoisePower').val();  // дБм

  // calculations
  k = Math.pow(10,k/10);
  var N0_calc = K_BOLT*(k-1)*T0;
  var Pn_calc = log10(N0_calc*Df*1e6)*10 + 30;

  if (isEqualToDigits(N0, N0_calc, DEC_RND) && isEqualToDigits(Pn, Pn_calc, DEC_RND+1)) {    //округление
    hometaskIsSolved = true;
    alert(TRg.correctHometask);
    currentPage = 'labwork.html';
    funcToLoad = loadPageLabwork;
    $('#dContent').load('projects/'+currentProject+TRg.langPrefix+'/'+currentPage, funcToLoad);
    window.scrollTo(0,0);
  } else {
    alert(TRg.incorrectHometask);
  };
};
