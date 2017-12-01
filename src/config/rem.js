(function (doc, win) {
  let docEl = doc.documentElement;
  let reSizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let recalc = function () {
    let clientWidth = docEl.clientWidth;
    if(!clientWidth){
      return;
    }else{
      docEl.style.fontSize = 20 * ( clientWidth / 320 ) + 'px';
    }
  };
  if(!doc.addEventListener) return;
  win.addEventListener( reSizeEvt, recalc, false);
  doc.addEventListener( 'DOMContentLoaded', recalc, false)
})(document, window)
