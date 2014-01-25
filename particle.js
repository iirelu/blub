function Particle(image, position, rotation, velocity) {
  if(typeof image === "string") {
    this.sprite = PIXI.Sprite.fromImage(image);
  } else if(image !== undefined) {
    this.sprite = new PIXI.Sprite(image);
  } else {
    this.sprite = PIXI.Sprite.fromImage("blub.png");
  }
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
