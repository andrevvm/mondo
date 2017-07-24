// This is where it all goes :)

var scrollTop = 0;

window.addEventListener('load', loop);
window.addEventListener('scroll', onScroll);
var el;
var mondo;
var img;
var img2;
var img3;
var text;
var quote;
var list;
var per = 0;
var velocity = 0;
var looping = false;

function loop() {
  el = document.getElementById('scroller');
  mondo = document.getElementById('mondo_img');
  img = document.querySelector('.mondo_1');
  img2 = document.querySelector('.mondo_2');
  img3 = document.querySelector('.mondo_3');
  img4 = document.querySelector('.mondo_4');
  text = document.querySelector('#content');
  quote = document.getElementById('quote');
  list = document.getElementById('list');
  window.requestAnimationFrame(function() {

    velocity *= 0.8;

    per = (scrollTop / (el.offsetHeight - window.innerHeight));

    if(per >= 0.3526075141267308) {
      //console.log(per);
      var reset = (el.offsetHeight - window.innerHeight) * (per * 0.4801516912);
      //looping = true;
      //window.scrollTo(0, reset);
      
    }

    var minus = 550 * per;
    var rotate = 280 * per;
    var y = -8 * per;

    mondo.style.transform = "rotateX(-70deg) rotateZ("+ (1 - velocity) +"deg) rotateY(0deg)";
    img.style.transform = "translate3d(-50%,"+(-y + 22)+"vh,"+(280 - minus)+"vh) scale3d(8,1,1) rotateZ(90deg) rotateY(-90deg)";
    //img2.style.transform = "translate3d(-50%,"+(-y + 2)+"vh,"+(720 - minus)+"vh) scale3d(8,1,1) rotateZ(90deg) rotateY(-90deg)";
    text.style.transform = "translate3d(0,"+((y * 500))+"px,0)";

    var textRect = quote.getBoundingClientRect();
    var listRect = list.getBoundingClientRect();
    if(listRect.bottom < -window.innerHeight + 50 ) {
      var offset = listRect.bottom + window.innerHeight - 50;
      quote.style.transform = "translate3d(0,"+(-offset)+"px,0)";
    }

    loop();

    looping = false;

  });
}

function onScroll() {
  window.requestAnimationFrame(function() {
    scrollTop = window.scrollY;
  });
}

var handleScroll = function(evt){
  if (!evt) evt = event;
  var direction = (evt.detail<0 || evt.wheelDelta>0) ? 1 : -1;
  velocity += evt.wheelDelta * 0.00025;
};
document.addEventListener('DOMMouseScroll',handleScroll,false); // for Firefox
document.addEventListener('mousewheel',    handleScroll,false);
