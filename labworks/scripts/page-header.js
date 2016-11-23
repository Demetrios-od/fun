function loadPageHeader () {
  // Инициализация страницы header.html
    $('#ulMenu li').addClass('upped').hover(menuItemHover).click(menuItemClick);
    $('#ulLang li').addClass('upped').hover(menuItemHover).click(langItemClick);
    $('.tmItem').mouseover(showDropdownMenu).mouseout(hideDropdownMenu);
    $('.tmblock li').click(globalMenuItemClick);
    $.getScript('projects/'+currentProject+'scripts/lang.js', function () {
      $('#ulLang li:first').click();
    });
};

function menuItemHover () {
  // Выполняется при наведении мыши на элемент меню
  if (!$(this).hasClass('act')) {
    $(this).toggleClass('upped').toggleClass('pressed');
  };
};

function menuItemClick () {
  // Выполняется при клике мышью по элементу меню
  if ($(this).hasClass('act')) {return};
  switch (this.id) {
    case 'liStatements':
      currentPage = 'statements.html';
      break;
    case 'liQuestions':
      currentPage = 'questions.html';
      break;
    case 'liWork':
      if (hometaskIsSolved) {
        currentPage = 'labwork.html';
        funcToLoad = loadPageLabwork;
      } else {
        currentPage = 'homework.html';
        funcToLoad = loadPageHomework;
      };
  };
  $('#ulMenu li').removeClass().addClass('upped');
  $(this).removeClass('upped').addClass('act');
  updatePage();
};

function langItemClick () {
  // Выполняется при клике мышью по переключателю языка
  if ($(this).hasClass('act')) {return};
  var scr;
  switch (this.id) {
    case 'liLangRus': scr = 'ru'; break;
    case 'liLangUkr': scr = 'ua'; break;
    case 'liLangEng': scr = 'en';
  };
  $('#ulLang li').removeClass().addClass('upped');
  $(this).removeClass('upped').addClass('act');
  document.title = titl[scr];
  $.getScript('scripts/lang_'+scr+'.js', function () {   // load TRg and TRid
    updatePage();
    document.getElementById('lbTitle').innerHTML = document.title;
    for (item in TRid) {
      document.getElementById(item).innerHTML = TRid[item];
    };
  });
};

function updatePage () {
  $('#dContent').load('projects/'+currentProject+TRg.langPrefix+'/'+currentPage, funcToLoad);
};

function showDropdownMenu () {
  $(this).find('.tmblock').show();
};

function hideDropdownMenu () {
  $(this).find('.tmblock').hide();
};

function globalMenuItemClick () {
  switch (this.id) {
    case 'lbLabworkTRx':   currentProject = 'trx/';   break;
    case 'lbLabworkRlink': currentProject = 'rlink/';
  };
  setInitialState();
  $('.tmblock').hide();
  $('#ulMenu li').removeClass().addClass('upped');
  $.getScript('projects/'+currentProject+'scripts/page-homework.js');
  $.getScript('projects/'+currentProject+'scripts/page-labwork.js');
  $.getScript('projects/'+currentProject+'scripts/lang.js', function () {
      $('#ulLang li.act').removeClass().click();
    });
};

