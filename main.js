var width = 500, height = 400;

var stage = new PIXI.Stage(0xAB99EF);
var renderer = PIXI.autoDetectRenderer(width, height);
document.getElementById("container").appendChild(renderer.view);


var blub = PIXI.Sprite.fromImage("blub.png");
blub.anchor.x = 0.5;
blub.anchor.y = 0.5;
blub.rotation = 0;
blub.velocity = {x: 0, y: 0};

var startTime = new Date().getTime();

requestAnimFrame(draw);

stage.addChild(blub);
function draw() {

  var time = (new Date().getTime() - startTime) / 1000.0;
  var mouse = stage.getMousePosition();

  blub.rotation = Math.atan((blub.position.y-mouse.y)/(blub.position.x-mouse.x));
  blub.velocity.x = (blub.velocity.x*5 + mouse.x - blub.position.x)/6;
  blub.velocity.y = (blub.velocity.y*5 + mouse.y - blub.position.y)/6;

  blub.position.x += blub.velocity.x/5;
  blub.position.y += blub.velocity.y/5;
  
  var dist = Math.sqrt(Math.pow(blub.position.x-mouse.x, 2) + Math.pow(blub.position.y-mouse.y, 2));
  audio.changeFrequency(dist*5);
  
  renderer.render(stage);
  requestAnimFrame(draw);
}
