(function () {
    var Asteroids = window.Asteroids = window.Asteroids || {};
    var Asteroid = Asteroids.Asteroid;
    var Util = Asteroids.Util;

    var Game = Asteroids.Game = function(width, height){
        this.width = width;
        this.height = height;
        this.asteroids = [];
        this.ship = new Asteroids.AltShip(this.shipStartPosition(), this);
        this.bullets = [];
    };

    Game.NUM_ASTEROIDS = 5;

    Game.randomPos = function (width, height) {
        var xCoord = Util.randomInRange(Asteroid.RADIUS, width - Asteroid.RADIUS);
        var yCoord = Util.randomInRange(Asteroid.RADIUS, height - Asteroid.RADIUS);
        return [xCoord, yCoord];
    };

    Game.prototype.addAsteroids = function () {
        for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
            this.asteroids.push(new Asteroids.Asteroid(Asteroids.Game.randomPos(this.width, this.height), this, 3));
        }

        console.log(this.asteroids);

    };

    Game.prototype.addAsteroid = function (asteroid) {
        this.asteroids.push(asteroid);
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
          objects[i].collideWith(objects[j]);
          objects[j].collideWith(objects[i]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids = this.asteroids.filter(function (otherAsteroid) {
      return otherAsteroid != asteroid;
    });
  };

  Game.prototype.removeBullet = function (bullet) {
    this.bullets = this.bullets.filter(function (otherBullet) {
      return otherBullet !== bullet;
    });
  };

  Game.prototype.allObjects = function() {
    return (this.asteroids.concat([this.ship]).concat(this.bullets));
  };

  Game.prototype.outOfBounds = function(pos) {
    return (0 > pos[0]) || (0 > pos[1]) || (this.width < pos[0]) || (this.height < pos[1]);
  };

})();
