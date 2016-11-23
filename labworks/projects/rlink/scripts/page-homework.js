$(function () {
    /* Инициализация страницы - выполняется при загрузке */
    $('#btnCheckHometask').click(btnCheckHometaskClick);
});

function btnCheckHometaskClick () {
  /* Нажатие на кнопку "Проверить результат" */

  // constants
  var DEC_RND = 1;
  var freq = 953e6;   // Гц
  var PRx = -107;     // дБм
  var PTx = [-10, -5, 0, 5, 10];   // дБм
  // initial data
  var G1 = +$('#ipAntennaTxGain').val();   // дБ
  var G2 = +$('#ipAntennaRxGain').val();   // дБ
  // answers to hometask
  var dist = [
    +$('#ipDistm10').val(),
    +$('#ipDistm5').val(),
    +$('#ipDist0').val(),
    +$('#ipDist5').val(),
    +$('#ipDist10').val(),
  ];

  // calculations
  var dist_calc = [];
  var isCorrect = true;
  for (var i=0; i<PTx.length; i++) {
    dist_calc[i] = 3e8/(4*Math.PI*freq)*Math.pow(10, (PTx[i]-PRx+G1+G2)/20);
    isCorrect = isCorrect && isEqualToDigits(dist[i]*1000, dist_calc[i], DEC_RND);
  };
  if (isCorrect) {
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
