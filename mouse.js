var mouse = (function () {
  var mouse = {down: 0, x: 0, y: 0};
  var container = document.getElementById("container");

  container.addEventListener("mousedown", function(e) {
    //e.originalEvent.preventDefault();
    if(e.button === 0) {
      mouse.down = 1;
    }
  });

  window.addEventListener("mouseup", function() {
    mouse.down = 0;
  });

  window.addEventListener("mousemove", function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  });

  return mouse;
}());
