(function () {
    var Asteroids = window.Asteroids = window.Asteroids || {};
    var Asteroid = Asteroids.Asteroid;
    var Util = Asteroids.Util;

    var Game = Asteroids.Game = function(width, height){
        this.difficulty = 1;
        this.moneys = 0;
        this.lives = Game.STARTING_LIVES;
        this.width = width;
        this.height = height;
        this.asteroids = [];
        this.ship = new Asteroids.AltShip(this.shipStartPosition(), this);
        this.bullets = [];
    };

    Game.STARTING_ASTEROIDS = 5;
    Game.STARTING_LIVES = 5;

    Game.randomPos = function (width, height) {
        var xCoord = Util.randomInRange(Asteroid.RADIUS, width - Asteroid.RADIUS);
        var yCoord = Util.randomInRange(Asteroid.RADIUS, height - Asteroid.RADIUS);
        return [xCoord, yCoord];
    };

    Game.prototype.addInitialAsteroids = function () {
        for (var i = 0; i < Game.STARTING_ASTEROIDS; i++) {
            this.addAsteroid(
                new Asteroids.Asteroid(
                    Asteroids.Game.randomPos(this.width, this.height),
                    this,
                    3
                )
            );
        }

        console.log(this.asteroids);

    };

    Game.prototype.addNewThings = function () {
        if (Math.random() > 0.995) {
            this.addAsteroid(
                new Asteroids.Asteroid(
                    Asteroids.Game.randomPos(this.width, this.height),
                    this,
                    3
                )
            );
        }
    };

    Game.prototype.addAsteroid = function (asteroid) {
        // while (this.areCollisionsWithThis(asteroid)) {
        //     asteroid.pos = Util.vecAdd(asteroid.pos, Util.randomVec(1));
        // }                      

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

    Game.prototype.wrap = function (pos, offset) {
        var offset = offset || 0;
        pos = Util.vecAdd(pos, [offset, offset])
        return [(pos[0] + this.width + 2*offset) % (this.width + 2*offset) - offset,
                (pos[1] + this.height + 2*offset) % (this.height + 2*offset) - offset];
  };

  Game.prototype.checkCollisions = function () {
    var i;
    var j;
    var objects = this.allObjects();
    for (i = 0; i < objects.length - 1; i++) {
     for (var j = i + 1; j < objects.length; j++) {
        if (objects[i].isCollideWith(objects[j])) {
          objects[i].collideWith(objects[j]);
          objects[j].collideWith(objects[i]);
        }
      }
    }
  };

    Game.prototype.areCollisionsWithThis = function (object) {
        var objects = this.allObjects();
        for (var j = 0; j < objects.length; j++) {
            if (object.isCollideWith(objects[j])) {
                return true;
            }
        }

        return false;
    };

    Game.prototype.step = function () {
        this.addNewThings();
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
