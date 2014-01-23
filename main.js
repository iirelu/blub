var width = 500, height = 400;

var stage = new PIXI.Stage(0xAB99EF);
var renderer = PIXI.autoDetectRenderer(width, height);
document.getElementById("container").appendChild(renderer.view);

var mousedown = 0;
var particles = [];
var blub;

function Particle(image, position, rotation, velocity) {
  this.sprite = PIXI.Sprite.fromImage(image || "blub.png");
  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.5;
  this.sprite.position.x = position ? position.x : 0;
  this.sprite.position.y = position ? position.y : 0;
  this.sprite.rotation = rotation || 0;
  this.velocity = velocity || {x: 0, y: 0, rotation: 0};
}

Particle.prototype.move = function() {
  this.sprite.position.x += this.velocity.x;
  this.sprite.position.y += this.velocity.y;
  this.sprite.rotation += this.velocity.rotation;
}

Particle.prototype.force = function(delta) {
  this.velocity.x += delta.x;
  this.velocity.y += delta.y;
  this.velocity.rotation = delta.rotation || 0;
}

blub = new Particle("blub.png", {x: width/2, y: height/2}, 0, {x: 0, y: 0, rotation: 0});
particles.push(blub);

var startTime = new Date().getTime();

requestAnimFrame(draw);

stage.addChild(blub.sprite);
function draw() {

  var time = (new Date().getTime() - startTime) / 1000.0;
  var mouse = stage.getMousePosition();
  var totaldistance = 0;
  var particlecount = 0;

  if(mousedown) {
    particles.push(new Particle("blub.png", {x: mouse.x, y: mouse.y}, time, {x: 0, y: 0, rotation: 0}));
    stage.addChild(particles[particles.length-1].sprite);
  }

  for(var i=0; i<particles.length; i++) {
    if(particles[i] === undefined) {
      //continue;
    }

    var p = particles[i];
    var offset = {x: mouse.x - p.sprite.position.x,
        y: mouse.y - p.sprite.position.y};

    totaldistance += Math.sqrt(Math.pow(offset.x, 2) + Math.pow(offset.y, 2));
    particlecount += 1;

    p.force({x: offset.x/200, y: offset.y/200});
    p.move();
  }
  
  //var dist = Math.sqrt(Math.pow(blub.position.x-mouse.x, 2) + Math.pow(blub.position.y-mouse.y, 2));
  audio.changeFrequency(totaldistance/particlecount);
  console.log(mousedown);
  
  renderer.render(stage);
  requestAnimFrame(draw);
}

stage.mousedown = function() {
  mousedown = 1;
}

stage.mouseup = function() {
  mousedown = 0;
}
