(function () {
    var Asteroids = window.Asteroids = window.Asteroids || {};
    var Asteroid = Asteroids.Asteroid;
    var Util = Asteroids.Util;

    var Game = Asteroids.Game = function(width, height){
        this.moneys = 1000000;
        this.lives = Game.STARTING_LIVES;
        this.width = width;
        this.height = height;
        this.asteroids = [];
        this.ship = new Asteroids.AltShip(this.shipStartPosition(), this);
        this.bullets = [];
        this.difficulty = 1;
    };

    Game.STARTING_ASTEROIDS = 1;
    Game.STARTING_LIVES = 5;

    Game.randomPos = function (width, height, interior) {
        var xCoord, yCoord;
        if (interior) {
            xCoord = Util.randomInRange(Asteroid.RADIUS, width - Asteroid.RADIUS);
            yCoord = Util.randomInRange(Asteroid.RADIUS, height - Asteroid.RADIUS);
        } else {
            var d4 = (Math.floor(Math.random() * 4));
            switch (d4) {
            case 0:
                xCoord = Util.randomInRange(0, width);
                yCoord = 0;
                break;
            case 1:
                xCoord = Util.randomInRange(0, width);
                yCoord = height;
                break;
            case 2:
                yCoord = Util.randomInRange(0, height);
                xCoord = 0;
                break;
            case 3:
                yCoord = Util.randomInRange(0, height);
                xCoord = width;
                break;
            }
        }
        
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
        if (Math.random() > (1 - (this.difficulty / 1000))) {
            this.addAsteroid(
                new Asteroids.Asteroid(
                    Asteroids.Game.randomPos(this.width, this.height),
                    this,
                    4
                )
            );
        } else if (Math.random() > (1 - (this.difficulty / 750))) {
            this.addAsteroid(
                new Asteroids.Asteroid(
                    Asteroids.Game.randomPos(this.width, this.height),
                    this,
                    3
                )
            );
        } else if (Math.random() > (1 - (this.difficulty / 500))) {
            this.addAsteroid(
                new Asteroids.Asteroid(
                    Asteroids.Game.randomPos(this.width, this.height),
                    this,
                    2
                )
            );
        } else if (Math.random() > (1 - (this.difficulty / 250))) {
            this.addAsteroid(
                new Asteroids.Asteroid(
                    Asteroids.Game.randomPos(this.width, this.height),
                    this,
                    1
                )
            );
        }
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

        this.reportScore();
        this.reportLives();
    };

    Game.prototype.reportScore = function () {
        var moneyThing = document.getElementById("money-figure");

        if (moneyThing.getAttribute("money") != this.moneys) {
            moneyThing.setAttribute("money", this.moneys);
            moneyThing.innerHTML = "You Have " + this.moneys + " Moneys!";
        }
    };

    Game.prototype.reportLives = function (lives) {
        var livesThing = document.getElementById("lives-figure");

        if (livesThing.getAttribute("lives") != this.lives) {
            livesThing.setAttribute("lives", this.lives);
            livesThing.innerHTML = "You Have " + this.lives + " Lives!";
        }
    };
    
    Game.prototype.shipStartPosition = function () {
        return Game.randomPos(this.width, this.height, true);
    };

    Game.prototype.moveObjects = function () {
        this.ship.act();
        
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
        if (this.lives <= 0) {
            this.end();
            return false;
        } else {
            this.addNewThings();
            this.moveObjects();
            this.checkCollisions();
            return true;
        }
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
    
    Game.prototype.getPaid = function (amount) {
        game.moneys += amount;
        game.difficulty += (amount / 1000);
    }


    Game.prototype.end = function () {
        
    }
    
})();
