(function () {

    window.Asteroids = window.Asteroids || {};
    var Asteroids = window.Asteroids;


    var Asteroid = Asteroids.Asteroid = function(pos, game, size){
        var speed = 3 / size;
        var vel = Asteroids.Util.randomVec(speed);
        Asteroids.MovingObject.call(this, pos, vel,
                                    (Asteroids.Asteroid.RADIUS * size / 2), Asteroids.Asteroid.COLOR, game);


        this.size = size;
    };
    
    Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

    Asteroid.prototype.collideWith = function (otherObject) {
      if (otherObject instanceof Asteroids.Ship) {
        otherObject.relocate();
      }
    };
    
    Asteroid.prototype.die = function () {
        console.log("he's dead jim.")
        debugger;
        
        var nuSize = this.size - 1;

        if (nuSize > 0) {
            for (var i = 0 ; i < 3; i++) {
                this.game.addAsteroid(new Asteroids.Asteroid(this.pos, this.game, nuSize));                
            }
        }

        this.game.removeAsteroid(this);
    };



    Asteroids.Asteroid.COLOR = 'grey'; 
    Asteroids.Asteroid.RADIUS = 30;

    console.log(Asteroids.Util);


})();
