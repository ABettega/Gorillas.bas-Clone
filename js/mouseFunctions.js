let mousePos;
let mouseDown = false;
let mouseUp = false;

addEventListener('mousemove', function (evt) {
  mousePos = getMousePos(canvas, evt);
}, false);
addEventListener('mousedown', function (evt) {
  mousePos = getMousePos(canvas, evt);
  mouseDown = true;
  mouseUp = false;
}, false);
addEventListener('mouseup', function (evt) {
  mousePos = getMousePos(canvas, evt);
  mouseDown = false;
  mouseUp = true;
}, false);

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
