var width = 500, height = 400;

var stage = new PIXI.Stage(0xCF7FC0);
var renderer = PIXI.autoDetectRenderer(width, height);
document.getElementById("container").appendChild(renderer.view);


var blub = PIXI.Sprite.fromImage("blub.png");
blub.anchor.x = 0.5;
blub.anchor.y = 0.5;
blub.rotation = 0;

var startTime = new Date().getTime();

requestAnimFrame(draw);

stage.addChild(blub);
function draw() {

  var time = (new Date().getTime() - startTime) / 1000.0;
  var mouse = stage.getMousePosition();

  blub.rotation = Math.atan((blub.position.y-mouse.y)/(blub.position.x-mouse.x));
  blub.position.x = (blub.position.x*5 + mouse.x)/6;
  blub.position.y = (blub.position.y*5 + mouse.y)/6;
  
  var dist = Math.sqrt(Math.pow(blub.position.x-mouse.x, 2) + Math.pow(blub.position.y-mouse.y, 2));
  audio.changeFrequency(dist*5);
  
  renderer.render(stage);
  requestAnimFrame(draw);
}
