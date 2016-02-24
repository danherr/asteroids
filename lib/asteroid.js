(function () {

    window.Asteroids = window.Asteroids || {};
    var Asteroids = window.Asteroids;
    var Util = Asteroids.Util;


    var Asteroid = Asteroids.Asteroid = function(pos, game, size){
        var speed = 3 / size;
        var vel = Asteroids.Util.randomVec(speed);
        var radius = Asteroids.Asteroid.RADIUS * size / 2;
        var hitPoints = Math.floor( size * game.difficulty);
        Asteroids.MovingObject.call(this, {
            pos: pos,
            vel: vel,
            radius: radius,
            objectColor: this.getFillColor(hitPoints),
            strokeColor: 'white',
            game: game
        });


        this.size = size;
        this.vertices = Asteroids.MovingObject.randomVertices(3 * size + 5
                                                              , radius);
        this.hitPoints = hitPoints;
    };
    
    Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

    Asteroid.prototype.getFillColor = function (hitPoints) {
        hitPoints = hitPoints || this.hitPoints;
        var colorNum = hitPoints * 5;
        colorNum = Math.min(colorNum, 255);
        return "rgb(" + colorNum + "," + colorNum + "," + colorNum + ")";
    };

    Asteroid.prototype.collideWith = function (otherObject) {
      if (otherObject instanceof Asteroids.Ship) {
          otherObject.relocate();
          this.game.lives -= 1;
      } else if (otherObject instanceof Asteroid) {
          var directionFromOther = Util.direction(Util.vecSub(this.pos, otherObject.pos));
          var backDirection = Util.direction(Util.scalerMult(this.vel, -1));
          var reflectionAngle = directionFromOther - backDirection;
          if ((reflectionAngle < Math.PI / 2) && (reflectionAngle > - Math.PI / 2)) {
              var newDirection = directionFromOther + reflectionAngle;
              var speed = Util.vecLength(this.vel);
              this.vel = Util.scalerMult(Util.unitVec(newDirection), speed);
          }
          // else {
          //     var speed = Util.vecLength(this.vel);              
          //     this.vel =  Util.scalerMult(Util.unitVec(directionFromOther), speed);
          // }
          
          if(this.vel != this.vel) {debugger};
          
      }
    };


    Asteroid.prototype.getHit = function (damage) {
        this.hitPoints -= damage;
        this.objectColor = this.getFillColor();
        if (this.hitPoints <= 0) {
            this.die();
            return Math.abs(this.hitPoints);
        } else {
            return 0;
        }        
    };
    
    Asteroid.prototype.die = function () {
        var nuSize = this.size - 1;

        if (nuSize > 0) {
            for (var i = 0 ; i < 3; i++) {
                this.game.addAsteroid(new Asteroids.Asteroid(this.pos, this.game, nuSize));      
            }
        } else {
            
            this.game.getPaid(Math.floor(Math.random() * 5) + 1);

        }
        
        this.game.removeAsteroid(this);
    };


    Asteroids.Asteroid.COLOR = '#111111'; 
    Asteroids.Asteroid.RADIUS = 40;

    console.log(Asteroids.Util);


})();
