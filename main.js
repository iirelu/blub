var width = window.innerWidth, height = window.innerHeight-150;

var stage = new PIXI.Stage(0x2e282b);
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

var particles = new PIXI.SpriteBatch();
stage.addChild(particles);

var time = {
  start: new Date().getTime(),
  current: new Date().getTime(),
  last: new Date().getTime(),
  millis: 0
}

requestAnimFrame(draw);

function draw() {
  time.current = new Date().getTime() - time.start;
  time.millis = time.current - time.last;

  ship.rotation = Math.PI/2 + Math.atan2(mouse.y-ship.position.y, mouse.x-ship.position.x);

  for(var i = 0; i<particles.children.length; i++) {
    if(particles.children[i] === undefined) {
      continue;
    }

    var particle = particles.children[i].particle;
    particle.move(time.millis/16);
    particle.sprite.alpha += -0.01 * time.millis/16;
    if(particle.sprite.alpha < 0) {

      if(particle.sprite.stage === stage) {
        particles.removeChild(particle.sprite);
      }
    }
  }

  ship.position.x += ship.velocity.x * time.millis/16;
  ship.position.y += ship.velocity.y * time.millis/16;

  if(mouse.down) {
    var smoke = textures.smoke[Math.floor(Math.random()*12)];
    var direction = new PIXI.Point(Math.cos(ship.rotation+Math.PI/2),
        Math.sin(ship.rotation+Math.PI/2));

    var position = {x: ship.position.x + direction.x*18 + Math.random()-0.5,
      y: ship.position.y + direction.y*18 + Math.random()-0.5};

    var rotation = (Math.random()-0.5) * Math.PI*2;

    var velocity = {x: direction.x*0.3 + (Math.random()-0.5)*0.2,
      y: direction.y*0.3 + (Math.random()-0.5)*0.2,
      rotation: 0.1};
    velocity.x += ship.velocity.x;
    velocity.y += ship.velocity.y;

    var particle = new Particle(smoke, position, rotation, velocity);
    particle.sprite.alpha = 0.7+Math.random()*0.6;
    particles.addChild(particle.sprite);

    ship.velocity.x += (ship.velocity.x - velocity.x)*0.01*time.millis;
    ship.velocity.y += (ship.velocity.y - velocity.y)*0.01*time.millis;

  }
  if(audio !== undefined) {
    audio.setLoudness(mouse.down);
    audio.setPosition(
        (ship.position.x/width*3)-0.5, (ship.position.y/width*3)-0.5
    );
  }

  renderer.render(stage);

  time.last = time.current;
  requestAnimFrame(draw);

}


window.addEventListener("resize", function() {
  width = window.innerWidth;
  height = window.innerHeight-150;

  renderer.resize(width, height);
});
