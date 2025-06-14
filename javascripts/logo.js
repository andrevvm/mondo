window.addEventListener('load', loop)
var el
var mondo
var img
var img2
var img3
var text
var quote
var list
var per = 0
var velocity = 0
var offset = 0
var wheel = 0
var y = 0

function loop() {
  el = document.body
  mondo = document.getElementById('mondo_img')
  img = document.querySelector('.mondo_1')
  img2 = document.querySelector('.mondo_2')
  img3 = document.querySelector('.mondo_3')
  img4 = document.querySelector('.mondo_4')
  window.requestAnimationFrame(function () {
    if (
      window.document.body.scrollTop >=
      window.document.body.scrollHeight - window.document.body.offsetHeight
    ) {
      window.document.body.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    }

    // if (offset > -0.004) offset = -0.004

    offset -= 0.0005
    velocity *= 0.8

    // if (y < -2.2) {
    //   offset = -0.555
    //   wheel = 0
    // }

    y = offset + wheel

    mondo.style.transform =
      'rotateX(-75deg) rotateZ(' + (1 - velocity) + 'deg) rotateY(0deg)'
    img.style.transform =
      'translate3d(-50%,' +
      (-y + 17) +
      'vh,' +
      (280 + y * 280) +
      'vh) scale3d(8,1,1) rotateZ(90deg) rotateY(-90deg)'

    loop()
  })
}

var handleScroll = function (evt) {
  if (!evt.wheelDelta) return
  if (y > 0) return

  velocity += evt.wheelDelta * 0.00025
  wheel += evt.wheelDelta * 0.0001
}
document.addEventListener('DOMMouseScroll', handleScroll, false) // for Firefox
document.addEventListener('mousewheel', handleScroll, false)
