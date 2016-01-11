(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var MovingObject = Asteroids.MovingObject;

  var Ship = Asteroids.Ship = function (pos, game) {
    MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR, game);
    this.heading = [0,1];
    this.firing = 0;
  };

  Asteroids.Util.inherits(Ship, MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.shipStartPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    this.heading = Asteroids.Util.normalize(impulse);
    this.vel = Asteroids.Util.vecAdd(this.vel, impulse);
    this.firing = 5;
  };

  Ship.prototype.fireBullet = function () {
    this.game.bullets.push(new Asteroids.Bullet(this.pos, this.vel, this.game, this.heading));
  };

  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = this.objectColor;
    ctx.strokeStyle = this.objectColor;
    ctx.lineWidth = 3;
    ctx.beginPath();

    heading = Asteroids.Util.direction(this.heading);

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      heading - Math.PI - 1.2,
      heading - Math.PI + 1.2,
      false
    );

    ctx.fill();

    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      heading  - 0.75,
      heading  + 0.75,
      false
    );

    ctx.fill();

    var shortHeading = Asteroids.Util.scalerMult(this.heading, this.radius * 0.8);

    ctx.beginPath();
    ctx.moveTo(this.pos[0] - shortHeading[0], this.pos[1] - shortHeading[1]);
    ctx.lineTo(this.pos[0] + shortHeading[0], this.pos[1] + shortHeading[1]);
    ctx.stroke();

    if (this.firing > 0) {
      ctx.strokeStyle = 'yellow';

      ctx.beginPath();
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius + 0.3,
        heading  - Math.PI - 0.5,
        heading  - Math.PI - 0.3,
        false
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius + 0.3,
        heading  - Math.PI + 0.5,
        heading  - Math.PI + 0.3,
        true
      );
      ctx.stroke();

      this.firing -= 1;
    }
  };

  Ship.RADIUS = 10;
  Ship.COLOR = 'blue';
  Ship.IMPULSE_SENSITIVITY = 2;

})();
