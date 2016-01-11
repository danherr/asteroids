(function () {

  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;


  var Asteroid = Asteroids.Asteroid = function(pos, game){
    var speed = 2;
    var vel = Asteroids.Util.randomVec(speed);
    Asteroids.MovingObject.call(this, pos, vel,
      Asteroids.Asteroid.RADIUS, Asteroids.Asteroid.COLOR, game);
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

  Asteroids.Asteroid.COLOR = 'grey';
  Asteroids.Asteroid.RADIUS = 30;

  console.log(Asteroids.Util);


})();
