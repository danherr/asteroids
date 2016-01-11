(function () {

  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;


  Asteroids.Asteroid = function(pos, game){
    var speed = 2;
    var vel = Asteroids.Util.randomVec(speed);
    Asteroids.MovingObject.call(this, pos, vel,
      Asteroids.Asteroid.RADIUS, Asteroids.Asteroid.COLOR, game);
  };

  Asteroids.Asteroid.COLOR = 'grey';
  Asteroids.Asteroid.RADIUS = 30;

  console.log(Asteroids.Util);

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

})();
