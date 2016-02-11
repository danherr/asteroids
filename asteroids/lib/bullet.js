(function () {
    var Asteroids = window.Asteroids = window.Asteroids || {};
    var MovingObject = Asteroids.MovingObject;
    var Util = Asteroids.Util;
    
    var Bullet = Asteroids.Bullet = function (pos, shipVel, game, heading){
        var muzzleVel = Util.scalerMult(heading, Bullet.MUZZLE_SPEED);
        
        MovingObject.call(this, {
            pos: pos,
            vel: Util.vecAdd(shipVel, muzzleVel),
            radius: Bullet.RADIUS,
            objectColor: Bullet.COLOR,
            game: game,
            vertices: [[-1,0], [0,1], [1,0], [0,-1]]
        });
    };
    Util.inherits(Bullet, MovingObject);

    Bullet.prototype.move = function () {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        if (this.game.outOfBounds(this.pos)) {
            this.game.removeBullet(this);
        }
    };

    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject instanceof Asteroids.Asteroid) {
            otherObject.die();
            this.game.removeBullet(this);
        }
    };

    Bullet.RADIUS = 2;
    Bullet.COLOR = 'white';
    Bullet.MUZZLE_SPEED = 5;
    Bullet.MAX_SPEED = 20;
    Bullet.MIN_SPEED = 3;

})();
