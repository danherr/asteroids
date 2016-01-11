(function () {
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var MovingObject = window.Asteroids.MovingObject = function(pos, vel, radius, objectColor, game) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.objectColor = objectColor;
    this.game = game;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.objectColor;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this.pos);
  };
})();
