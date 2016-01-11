(function () {

  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;


  Asteroids.Asteroid = function(pos){
    var speed = 5;
    var vel = Asteroids.Util.randomVec(speed);
    Asteroids.MovingObject.call(this, pos, vel, Asteroids.Asteroid.RADIUS, Asteroids.Asteroid.COLOR);
  };

  Asteroids.Asteroid.COLOR = 'grey';
  Asteroids.Asteroid.RADIUS = 30;

  console.log(Asteroids.Util);

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

})();
