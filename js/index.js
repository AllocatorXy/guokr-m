/* global FastClick:false, Swiper:false, IScroll:false */

function $(fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
      fn && fn();
    }, false);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState == 'complete') {
        fn && fn();
      }
    });
  }
}
function async(u, c) {
  const t = 'script',
    [ o, s ] = [ document.createElement(t), document.getElementsByTagName(t)[0] ];
  o.src = u;
  c && o.addEventListener('load', e => c(null, e), false);
  s.parentNode.insertBefore(o, s);
}

// swiper
async('./js/swiper.min.js', () => {
  // banner
  const swiper = new Swiper('.swiper-container', {
    effect: 'cube',
    cube: {
      slideShadows: true,
      shadow: false,
    }
  });
  // hot-ans tabs
  const hot = new Swiper('.hot-ans', {
    onSlideChangeStart: (swiper) => {
      const pn = document.querySelector('.hot-ans .index');
      const aLi = pn.querySelectorAll('li');
      for (let i = 0; i < aLi.length; i++) {
        aLi[i].classList.remove('act');
      }
      pn.querySelector(`li:nth-child(${swiper.activeIndex + 1})`).classList.add('act');
    }
  });
  document.querySelector('.hot-ans .index').addEventListener('click', function(e) {
    if (e.target.tagName == 'LI') {
      hot.slideTo(e.target.dataset.s, 600, true);
    }
  }, false);
});

$(function() {

  // fastclick
  async('./js/fastclick.min.js', () => {
    FastClick.attach(document.body);
  });

  // rem
  const fontSize = Math.ceil(parseFloat(getComputedStyle(document.documentElement, false).fontSize));
  document.documentElement.style.fontSize = Math.ceil(fontSize * (document.documentElement.clientWidth / 320)) + 'px';
  window.addEventListener('resize', function() {
    document.documentElement.style.fontSize = Math.ceil(fontSize * (document.documentElement.clientWidth / 320)) + 'px';
  }, false);

  // toggle menu
  document.getElementsByClassName('menu-btn')[0].addEventListener('click', () => {
    const bar = document.querySelector('.navbar');
    if (bar.classList.contains('act')) {
      bar.classList.remove('act');
    } else {
      bar.classList.add('act');
    }
  }, false);
  document.addEventListener('click', (e) => {
    const toggle = document.querySelector('.menu-btn');
    const bar = document.querySelector('.navbar');
    if (e.target == toggle) return;
    bar.classList.remove('act');
  }, false);

// let myScroll;
// async('./js/iscroll.js', function() {
//   myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
//   const oBtn = document.querySelector('.btn-to-top');
//   oBtn.addEventListener('click', function() {
//     myScroll.scrollTo(0, -100, 1000, IScroll.utils.ease.elastic);
//   }, false);
// });

  // go to top
  const oBtnToTop = document.querySelector('.btn-to-top');
  Math.easeInCubic = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  };
  async('./js/rAF.js', function() {
    oBtnToTop.addEventListener('click', function() {
      cancelAnimationFrame(oBtnToTop.timer);
      let now = 0;
      const during = 60,
            start = document.body.scrollTop;

      // oBtnToTop.timer = requestAnimationFrame(cbk);
      cbk();
      function cbk() {
        if (document.body.scrollTop > 0) {
          now++;
          document.body.scrollTop = Math.floor(Math.easeInCubic(now, start, -start, during));
          oBtnToTop.timer = requestAnimationFrame(cbk);
        } else {
          // return;
          cancelAnimationFrame(oBtnToTop.timer);
        }
      }
    }, false);
  });

});
