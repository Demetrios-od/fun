// Этот модуль реализует функции для работы со структурными схемами,
// массивами и числами.

function Scheme() {
  /*
  Этот класс описывает произвольную схему, состоящую из произвольного числа узлов.
  Каждый узел может иметь произвольное число входов и выходов,
  и характеризуется одной функцией, которая вычисляет сигналы на выходах,
  если известны сигналы на входах.
  Нумерация всех входов и выходов начинается с нуля.
  */

  function Device (nargin, nargout, func, params) {
    this.isPassed = false;
    this.input = new Array(nargin);
    this.output = new Array(nargout);
    this.run = func;
    if (params) {
      this.params = params;
    } else {
      this.params = {};
    };
  };

  var sig = [];
  var dev = {};

  function addDevice (name, nargin, nargout, func, params) {
    if (name in dev) {
      return false;
    };
    dev[name] = new Device(nargin, nargout, func, params);
    var siglen = sig.length;
    sig.length += nargout;
    for (var i=siglen; i<siglen+nargout; i++) {
      dev[name].output[i-siglen] = i;
    };
    return true;
  };

  function setDeviceParams (name, params) {
    if (name in dev) {
      for (var newpar in params) {
        dev[name].params[newpar] = params[newpar];
      };
      return true;
    };
    return false;
  };

/*
  function getDevice (name) {
    if (name) {
      return dev[name];
    } else {
      return dev;
    };
  };
*/

  function delDevice (name) {
    if (name in dev) {
      delete dev[name];
      return true;
    };
    return false;
  };

  function setLink (devout, nout, devin, nin) {
    // begin = {devname: string, nout: number}
    // end = {devname: string, nin: number}
    if ( !((devout in dev) && (devin in dev)) ) {
      return false;
    };
    if ( (nout >= sig.length) || (nin >= sig.length) ) {
      return false;
    };
    dev[devin].input[nin] = dev[devout].output[nout];
    return true;
  };

  function delLink (devname, nin) {
    // удаляется линк на вход nin устройства devname
    if ( !(point.devname in dev) || (point.nin >= sig.length) ) {
      return false;
    };
    dev[point.devname].input[point.nin] = null;
    return true;
  };

  function run () {
    var d, i;
    // отмечаем все устройства как непройденные
    for (d in dev) {
      dev[d].isPassed = false;
    };
    sig = new Array(sig.length);     // очищаем все сигналы
    var smthPassed = true;    // чтобы войти в цикл while
    while (smthPassed) {
      // если хоть одно устройство было пройдено на предыдущем шаге,
      // то надо выполнить еще один шаг
      smthPassed = false;     // на этой итерации еще ни одно устройство не пройдено
      for (d in dev) {
        // если устройство уже пройдено, или не задана его функция,
        // то его надо пропустить
        if (dev[d].isPassed || !dev[d].run) continue;
        // если устройство не было пройдено, то идем дальше
        var nei = true;     // у dev[d] нет пустых входов (сейчас выясним)
        for (i=0; i<dev[d].input.length; i++) {
          // если устройство - генератор, то этот цикл ни разу не выполняется
          var inpi = dev[d].input[i];
          if ( !(inpi>-1 && sig[inpi]) ) {
            // если у устройства обнаружился пустой вход - прекращаем смотреть другие входы
            nei = false;
            break;
          };
        };
        if (nei) {
          // если у устройства нет пустых входов, и оно еще не было пройдено,
          // то надо выполнить его функцию - т.е. пройти устройство
          var sigin = [];
          for (i=0; i<dev[d].input.length; i++) {
            sigin[i] = sig[dev[d].input[i]];
          };
          var sigout = dev[d].run(sigin, dev[d].params);
          if (!sigout) sigout = [];
          for (i=0; i<sigout.length; i++) {
            sig[dev[d].output[i]] = sigout[i];
          };
          dev[d].isPassed = true;
          smthPassed = true;
        };
      };
    };
    this.onFinish();
  };

  function getSignal (devname, nout) {
    // Возвращает сигнал с выхода nout устройства devname
    if ( !(devname in dev) || (nout >= sig.length) ) {
      return null;
    };
    return sig[ dev[devname].output[nout] ];
  };

  function onFinish () {};

  return {
    addDevice: addDevice,
    setDeviceParams: setDeviceParams,
    // getDevice: getDevice,
    delDevice: delDevice,
    setLink: setLink,
    delLink: delLink,
    run: run,
    getSignal: getSignal,
    onFinish: onFinish
  };
};

function Complex(re, im){
  this.re = re;
  this.im = im;
  this.print = print;
  this.conj = conj;
  this.abs = abs;
  this.arg = arg;
  this.plus = plus;
  this.minus = minus;
  this.mul = mul;
  this.div = div;
  this.exp = exp;
  this.pow = pow;
  this.log = log;

  /*
  this.sin=sin;
  this.cos=cos;
  this.tan=tg;
  this.ctg=ctg;
  this.asin=asin;
  this.acos=acos;
  this.atan=atan;
  */

  function print(){
    var ire, iim, s;     // internal Re and Im
    ire = (Math.abs(this.re) < 1.E-7)? 0 : this.re;
    iim = (Math.abs(this.im) < 1.E-7)? 0 : this.im;
    s = (iim >= 0)? ire+'+'+iim+'i' : ire+' '+iim+'i';
    return s;
  };

  function conj(){
    return new Complex(this.re, -this.im);
  };

  function abs(){
    var x = this.re*this.re + this.im*this.im;
    return Math.sqrt(x);
  };

  function arg(){
    var p = 0;
    switch (sign(this.re)) {
      case -1:
        p = (this.im == 0)? Math.PI : Math.PI*sign(this.im);
      case 1:
        return Math.atan(this.im/this.re) + p;
        break;
      case 0:
        switch (sign(this.im)) {
          case  1: return  Math.PI/2; break;
          case -1: return -Math.PI/2; break;
          case  0: return  0; break;
        };
        break;
    };
  };

  function plus(x){
    var ire, iim;
    if (typeof x == 'number') {
      ire = this.re + x;
      iim = this.im;
    } else {
      ire = this.re + x.re;
      iim = this.im + x.im;
    };
    return new Complex(ire, iim);
  };

  function minus(x){
    var ire, iim;
    if (typeof x == 'number') {
      ire = this.re - x;
      iim = this.im;
    } else {
      ire = this.re - x.re;
      iim = this.im - x.im;
    };
    return new Complex(ire, iim);
  };

  function mul(x){
    var ire, iim;
    if (typeof x == 'number') {
      ire = this.re*x;
      iim = this.im*x;
    } else {
      ire = this.re*x.re - this.im*x.im;
      iim = this.re*x.im + this.im*x.re;
    };
    return new Complex(ire, iim);
  };

  function div(x){
    var ire, iim;
    if (typeof x == 'number') {
      ire = this.re/x;
      iim = this.im/x;
    } else {
      var d = x.re*x.re + x.im*x.im;
      ire = (this.re*x.re + this.im*x.im)/d;
      iim = (this.im*x.re - this.re*x.im)/d;
    };
    return new Complex(ire, iim);
  };

  function exp(){
    var p = Math.exp(this.re);
    var ire = p * Math.cos(this.im);
    var iim = p * Math.sin(this.im);
    return new Complex(ire, iim);
  };

  function pow(x){
    if (typeof x == 'number') {
      var f = this.arg();
      var p = Math.pow(this.abs(), x);
      var ire = p * Math.cos(f*x);
      var iim = p * Math.sin(f*x);
      return new Complex(ire, iim);
    } else {
      return x.mul(this.log()).exp();
    };
  };

  function log(){
    var ire = Math.log(this.abs());
    var iim = this.arg();
    return new Complex(ire, iim);
  };

/*
function sin(){
  var i=new Complex(0,1);
  var t=new Complex(2,0);
  var tm1=i.mul(this).exp();
  var tm2=i.conj().mul(this).exp();
  var tm3=i.mul(t);
  return tm1.minus(tm2).div(tm3);
}

function cos(){
  var i=new Complex(0,1);
  var t=new Complex(2,0);
  var tm1=i.mul(this).exp();
  var tm2=i.conj().mul(this).exp();
  return tm1.plus(tm2).div(t);
}

function tg(){
  return this.sin().div(this.cos());
}

function ctg(){
  return this.cos().div(this.sin());
}

function asin(){
var i=new Complex(0,1);
var t=new Complex(1,0);
var tm1=t.minus(this.pow(2)).pow(.5);
var tm2=i.mul(this).plus(tm1);
  return tm2.log().div(i);
}

function acos(){
var i=new Complex(0,1);
var t=new Complex(1,0);
var tm1=this.pow(2).minus(t).pow(.5);
var tm2=this.plus(tm1);
return tm2.log().div(i);
}

function atan(){
var i=new Complex(0,1);
var t=new Complex(1,0);
var tm1=t.plus(i.mul(this));
var tm2=t.minus(i.mul(this));
return tm1.div(tm2).log().div(i.plus(i));
}
*/
}

function dft(x) {
  // Прямое дискретное преобразование Фурье

  // Проверяем, является ли входной аргумент массивом
  if (!x.splice) {
    console.log('DFT error: Input argument is not an array.');
    return;
  };

  var N = x.length;
  var FX = [];   // Спектр - пока что пустой массив
  var W = new Complex(Math.cos(2*Math.PI/N), Math.sin(-2*Math.PI/N));
  for (var k=0; k<N; k++) {
    // вычисляем одно значение x_k
    var s = new Complex(0, 0);
    for (var n=0; n<N; n++) {
      s = s.plus(W.pow(n*k).mul(x[n]));
    };
    FX[k] = s;
  };
  return FX;
};

function idft(x) {
  // Обратное дискретное преобразование Фурье

  // Проверяем, является ли входной аргумент массивом
  if (!x.splice) {
    console.log('IDFT error: Input argument is not an array.');
    return;
  };

  var N = x.length;
  var FX = [];   // Спектр - пока что пустой массив
  var W = new Complex(Math.cos(2*Math.PI/N), Math.sin(2*Math.PI/N));
  for (var n=0; n<N; n++) {
    // вычисляем одно значение x_n
    var s = new Complex(0, 0);
    for (var k=0; k<N; k++) {
      s = s.plus(W.pow(n*k).mul(x[k]));
    };
    FX[n] = s.div(N);
  };
  return FX;
};

function conv(x, y) {
  // свёртка двух действительных векторов
  if (typeof x == 'number')
    x = [x];
  if (typeof y == 'number')
    y = [y];
  var M = x.length-1;
  var N = y.length-1;
  var z = [];
  for (var i=0; i<=M+N; i++) {
    z[i] = 0;
    for (var j=Math.max(0, i-N); j<=Math.min(i, M); j++) {
      z[i] = z[i] + x[j]*y[i-j];
    };
  };
  return z;
};

function cyconv(x, y) {
  // циклическая свёртка двух действительных векторов
  if (typeof x == 'number')
    x = [x];
  if (typeof y == 'number')
    y = [y];
  // векторы должны иметь одинаковую длину
  var N = x.length;
  if (N != y.length) {
    console.log('CYCONV error: vectors must have the same length.');
    return;
  };
  var z = [];
  for (var i=0; i<N; i++) {
    z[i] = 0;
    for (var j=0; j<N; j++) {
      var p = (i-j < 0)? y[i-j+N] : y[i-j];
      z[i] = z[i] + x[j]*p;
    };
  };
  return z;
};

function convcompl(x, y) {
  // свёртка двух комплексных векторов
  var M = x.length-1;
  var N = y.length-1;
  var z = [];
  for (var i=0; i<=M+N; i++) {
    z[i] = new Complex(0, 0);
    for (var j=Math.max(0, i-N); j<=Math.min(i, M); j++) {
      z[i] = z[i].plus(x[j].mul(y[i-j]));
    };
  };
  return z;
};

function cyconvcompl(x, y) {
  // циклическая свёртка двух комплексных векторов
  // векторы должны иметь одинаковую длину
  var N = x.length;
  if (N != y.length) {
    console.log('CYCONVCOMPL error: vectors must have the same length.');
    return;
  };
  var z = [];
  for (var i=0; i<N; i++) {
    z[i] = new Complex(0, 0);
    for (var j=0; j<N; j++) {
      var p = (i-j < 0)? y[i-j+N] : y[i-j];
      z[i] = z[i].plus(x[j].mul(p));
    };
  };
  return z;
};

function rz2nrz(x) {
  var y = new Array(x.length);
  for (var i=0; i<x.length; i++) {
    y[i] = 2*x[i]-1;
  };
  return y;
};

function expand(x, f) {
  var xc = new Array(x.length*f);
  for (var i=0; i<x.length; i++) {
    for (var j=0; j<f; j++) {
      xc[i*f+j] = x[i];
    };
  };
  return xc;
};

function sign(x){
  if (x == 0) return 0;
  else if (x > 0) return 1;
  else return -1;
};

function log10(x) {
  return Math.log(x)/Math.LN10;
};

function gaussPulse(N, f, BT) {
  // генерирует нормированный гауссовский импульс
  // длиной от -N до N тактов, по f отсчетов в каждом такте
  var a = BT/f*Math.sqrt(2*Math.PI/Math.LN2);
  var b = -2*Math.PI*Math.PI*BT*BT/Math.LN2;
  var y = [];
  for (var i=0; i<=2*N*f; i++) {
    y[i] = a*Math.exp(b*(i/f-N)*(i/f-N));
  };
  return y;
};

function times2dB(x) {
  return 10*log10(x);
};

function dB2times(x) {
  return Math.pow(10, x/10);
};

function isEqualToDigits (x1, x2, dec) {
  // Определяет, равны ли два числа x1 и x2 с точностью до dec значащих цифр
  var rp = Math.pow(10, Math.floor(log10(Math.abs(x1))) - dec+1);
  return Math.round(x1/rp) == Math.round(x2/rp);
};

function mod (x, y) {
  // возвращает остаток от деления x на y
  return (x/y - Math.floor(x/y))*y;
};
