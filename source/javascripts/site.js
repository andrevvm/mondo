// This is where it all goes :)

var scrollTop = 0;

window.addEventListener('load', loop);
window.addEventListener('scroll', onScroll);
var el;
var img;
var img2;
var img3;
var per = 0;
var userScroll = false;

function loop() {
  el = document.getElementById('scroller');
  img = document.querySelector('.mondo_1');
  img2 = document.querySelector('.mondo_2');
  img3 = document.querySelector('.mondo_3');
  img4 = document.querySelector('.mondo_4');
  window.requestAnimationFrame(function() {

    if(!userScroll)
      window.scrollTo(0, scrollTop + 1);

    per = (scrollTop / (el.offsetHeight - window.innerHeight));

    if(per >= 0.3526075141267308) {
      //console.log(per);
      var reset = (el.offsetHeight - window.innerHeight) * (per * 0.4801516912);
      window.scrollTo(0, reset);
      //scrollTop = window.scrollY;
    }

    var minus = 2400 * per;
    var rotate = 70 * per;
    var y = -100 * per;

    img.style.transform = "translate3d(-50%,"+(-y + 22)+"vh,"+(280 - minus)+"vh) scale3d(8,1,1) rotateZ(90deg) rotateY(-90deg)";
    img2.style.transform = "translate3d(-50%,"+(-y + 2)+"vh,"+(720 - minus)+"vh) scale3d(8,1,1) rotateZ(90deg) rotateY(-90deg)";

    

    loop();

    userScroll = false;
  });
}

function onScroll() {
  window.requestAnimationFrame(function() {
    userScroll = true;
    scrollTop = window.scrollY;
  });
}
