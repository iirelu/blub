var width = 500, height = 400;

var stage = new PIXI.Stage(0x231F30);
var renderer = PIXI.autoDetectRenderer(width, height);
document.getElementById("container").appendChild(renderer.view);

var spritesheet = PIXI.BaseTexture.fromImage("spritesheet.png");
var textures = {
  rocket: new PIXI.Texture(spritesheet, new PIXI.Rectangle(0,0,22,38)),
  smoke: []
}
// getting all the smoke particle textures mathematically instead of tediously
for(var i=0; i<12; i++) {
  // (i/2|0) is an integer division hack
  var frame = new PIXI.Rectangle(23 + (i%2)*8, (i/2|0)*8, 8, 8);
  textures.smoke[i] = new PIXI.Texture(spritesheet, frame);
}

var ship = new PIXI.Sprite(textures.rocket);
ship.anchor.x = 0.5;
ship.anchor.y = 0.5;
ship.position.x = width/2;
ship.position.y = height/2;
ship.velocity = {x: 0, y: 0};
stage.addChild(ship);

var particles = [];

var startTime = new Date().getTime();

requestAnimFrame(draw);

function draw() {
  var time = (new Date().getTime() - startTime) / 1000.0;
  var mouse = stage.getMousePosition();

  ship.rotation = Math.PI/2 + Math.atan2(mouse.y-ship.position.y, mouse.x-ship.position.x);

  for(var i = 0; i<particles.length; i++) {
    if(particles[i] === undefined) {
      continue;
    }

    particles[i].move();
    particles[i].sprite.alpha += -0.01;
    if(particles[i].sprite.alpha < 0) {
      particles.splice(i, i);
    }
  }

  ship.position.x += ship.velocity.x;
  ship.position.y += ship.velocity.y;

  if(mousedown) {
    var smoke = textures.smoke[Math.floor(Math.random()*12)];
    var direction = new PIXI.Point(Math.cos(ship.rotation+Math.PI/2),
        Math.sin(ship.rotation+Math.PI/2));

    var position = {x: ship.position.x + direction.x*15 + Math.random()-0.5,
      y: ship.position.y + direction.y*15 + Math.random()-0.5};

    var rotation = (Math.random()-0.5) * Math.PI*2;

    var velocity = {x: direction.x*0.3 + (Math.random()-0.5)*0.2,
      y: direction.y*0.3 + (Math.random()-0.5)*0.2,
      rotation: 0.1};
    velocity.x += ship.velocity.x;
    velocity.y += ship.velocity.y;

    var particle = new Particle(smoke, position, rotation, velocity);
    particle.opacity += Math.random();
    particles.push(particle);
    stage.addChild(particles[particles.length-1].sprite);

    ship.velocity.x += -velocity.x*0.001;
    ship.velocity.y += -velocity.y*0.001;

    audio.changeLoudness(5);
  } else {
    audio.changeLoudness(0);
  }


  renderer.render(stage);
  requestAnimFrame(draw);
}

var mousedown = 0;
stage.mousedown = function() {
  mousedown = 1;
}

stage.mouseup = function() {
  mousedown = 0;
}
