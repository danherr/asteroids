(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var MovingObject = Asteroids.MovingObject;

  var Ship = Asteroids.Ship = function (pos, game) {
    MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR, game);
  };

  Asteroids.Util.inherits(Ship, MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.shipStartPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel = Asteroids.Util.vecAdd(this.vel, impulse);
  };

  Ship.prototype.fireBullet = function () {
    this.game.bullets.push(new Asteroids.Bullet(this.pos, this.vel, this.game));
  };

  Ship.RADIUS = 10;
  Ship.COLOR = 'blue';

})();
