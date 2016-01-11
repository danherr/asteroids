(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid;
  var Util = Asteroids.Util;

  var Game = Asteroids.Game = function(width, height){
    this.width = width;
    this.height = height;
    this.asteroids = [];
    this.ship = new Asteroids.Ship(this.shipStartPosition(), this);
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
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.shipStartPosition = function () {
    // return [this.width / 2, this.height / 2];
    return Game.randomPos(this.width, this.height);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    return [(pos[0] + this.width) % this.width, (pos[1] + this.height) % this.height];
  };

  Game.prototype.checkCollisions = function () {
    var i;
    var j;
    var objects = this.allObjects();
    for (i = 0; i < objects.length - 1; i++) {
      for (j = i + 1; j < objects.length; j++) {
        if (objects[i].isCollideWith(objects[j])) {
          alert("collision");
          objects[i].collideWith(objects[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    this.asteroids = this.asteroids.filter(function (otherAsteroid) {
      return otherAsteroid != asteroid;
    });
  };

  Game.prototype.allObjects = function() {
    return (this.asteroids.concat([this.ship]));
  };

})();
