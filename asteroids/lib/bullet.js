(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var MovingObject = Asteroids.MovingObject;
  var Util = Asteroids.Util;

  var Bullet = Asteroids.Bullet = function (pos, vel, game){
    var muzzleVel = Util.scalerMult(Util.normalize(vel), Bullet.MUZZLE_SPEED);
    MovingObject.call(this, pos, Util.vecAdd(vel, muzzleVel), Bullet.COLOR, game);

  };
  Util.inherits(Bullet, MovingObject);

  Bullet.RADIUS = 1;
  Bullet.COLOR = 'red';
  Bullet.MUZZLE_SPEED = 5;

})();
