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
      this.asteroids.push(new Asteroids.Asteroid(Asteroids.Game.randomPos(this.width, this.height), this));
    }

    console.log(this.asteroids);

  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    return [(pos[0] + this.width) % this.width, (pos[1] + this.height) % this.height];
  };


})();
