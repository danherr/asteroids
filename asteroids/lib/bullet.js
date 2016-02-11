(function () {
    var Asteroids = window.Asteroids = window.Asteroids || {};
    var MovingObject = Asteroids.MovingObject;
    var Util = Asteroids.Util;
    
    var Bullet = Asteroids.Bullet = function (params){
        var muzzleSpeed = params.muzzleSpeed || Bullet.MUZZLE_SPEED
        var muzzleVel = Util.scalerMult(params.heading, muzzleSpeed);
        
        MovingObject.call(this, {
            pos: params.pos,
            vel: Util.vecAdd(params.shipVel, muzzleVel),
            radius: params.radius || Bullet.RADIUS,
            objectColor: params.color || Bullet.COLOR,
            game: params.game,
            vertices: params.vertices || [[-1,0], [0,1], [1,0], [0,-1]]
        });

        this.damage = params.damage || 1;
        this.minSpeed = params.minSpeed || Bullet.MIN_SPEED;
        this.maxSpeed = params.maxSpeed || Bullet.MAX_SPEED;
        this.noWrap = params.noWrap || true;
    };
  
    Util.inherits(Bullet, MovingObject);

    Bullet.prototype.move = function () {
        var speed = Util.vecLength(this.vel)

        if (speed > this.maxSpeed) {
            this.vel = Util.scaleTo(this.vel, this.maxSpeed);
        } else  if (speed < this.minSpeed) {
            this.vel = Util.scaleTo(this.vel, this.minSpeed);            
        }
        
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        if (this.noWrap && this.game.outOfBounds(this.pos)) {
            this.game.removeBullet(this);
        }
    };

    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject instanceof Asteroids.Asteroid) {
            otherObject.getHit(this.damage);
            this.game.removeBullet(this);
        }
    };




    
    Bullet.RADIUS = 2;
    Bullet.COLOR = 'white';
    Bullet.MUZZLE_SPEED = 7;
    Bullet.MAX_SPEED = 20;
    Bullet.MIN_SPEED = 4;
})();
