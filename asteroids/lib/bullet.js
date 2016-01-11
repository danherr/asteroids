(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var MovingObject = Asteroids.MovingObject;
  var Util = Asteroids.Util;

  var Bullet = Asteroids.Bullet = function (pos, vel, game){
    var muzzleVel = Util.scalerMult(Util.normalize(vel), Bullet.MUZZLE_SPEED);
    MovingObject.call(this, pos, Util.vecAdd(vel, muzzleVel), Bullet.RADIUS, Bullet.COLOR, game);
  };
  Util.inherits(Bullet, MovingObject);

  Bullet.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.game.outOfBounds(this.pos)) {
      this.game.removeBullet(this);
    }
  };

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.removeAsteroid(otherObject);
      this.game.removeBullet(this);
    }
  };

  Bullet.RADIUS = 2;
  Bullet.COLOR = 'red';
  Bullet.MUZZLE_SPEED = 5;

})();
