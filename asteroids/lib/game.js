(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid;
  var Util = Asteroids.Util;

  var Game = Asteroids.Game = function(width, height){
    this.width = width;
    this.height = height;
    this.asteroids = [];
  };

  Game.NUM_ASTEROIDS = 10;

  Game.randomPos = function (width, height) {
    var xCoord = Util.randomInRange(Asteroid.RADIUS, width - Asteroid.RADIUS);
    var yCoord = Util.randomInRange(Asteroid.RADIUS, height - Asteroid.RADIUS);
    return [xCoord, yCoord];
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(Asteroids.Game.randomPos(this.width, this.height)));
    }

    console.log(this.asteroids);

  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.start = function (canvas) {
    ctx = canvas.getContext("2d");
    this.addAsteroids();

    setInterval(function() {
      this.draw(ctx);
      this.moveObjects();
    }.bind(this), 500);
  };


})();
