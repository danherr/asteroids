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
            strokeColor: params.color || Bullet.COLOR,
            game: params.game,
            vertices: params.vertices || [[-1,0], [0,1], [1,0], [0,-1]],
            heading: params.heading
        });

        this.damage = params.damage || 1;
        this.minSpeed = params.minSpeed || Bullet.MIN_SPEED;
        this.maxSpeed = params.maxSpeed || Bullet.MAX_SPEED;
        this.noWrap = params.noWrap || true;
        this.acceleration = params.acceleration || 0;
    };
  
    Util.inherits(Bullet, MovingObject);

    Bullet.prototype.move = function () {
        var accelVec = Util.scalerMult(this.heading, this.acceleration);
        this.vel = Util.vecAdd(this.vel, accelVec);
        var speed = Util.vecLength(this.vel);
        
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
            if (this.damage > 0) {
                this.damage = otherObject.getHit(this.damage);
            }
            
            if (this.damage <= 0) {
                this.game.removeBullet(this);
            }
        }
    };


    var Missile = Asteroids.Missile = function (params) {
        params.minSpeed = Missile.MIN_SPEED;
        params.maxSpeed = Missile.MAX_SPEED;
        params.damage = 9;
        params.color = Missile.COLOR;
        params.acceleration = Missile.ACCELERATION;
        params.muzzleSpeed = 0;
        params.radius = Missile.RADIUS;

        Bullet.call(this, params);

        this.vertices = [
            Asteroids.Util.scalerMult(this.heading, this.radius),
            Asteroids.Util.scalerMult(this.heading, this.radius/3),
            Asteroids.Util.normal(this.heading, 1),
            [0,0],
            Asteroids.Util.scalerMult(this.heading, this.radius/3),            
            Asteroids.Util.normal(this.heading, -1),
            [0,0]
        ]

    }

    Asteroids.Util.inherits(Missile, Bullet);

    
    var Laser = Asteroids.Laser = function (params) {
        params.minSpeed = Laser.SPEED;
        params.maxSpeed = Laser.SPEED;
        params.color = Laser.COLOR;
        params.damage = 3;
        params.radius = Laser.RADIUS;
        params.innerRadius = 2;


        Bullet.call(this, params);

        this.vel = Util.scalerMult(params.heading, Laser.SPEED)

        this.vertices = [
            Asteroids.Util.vecAdd(
                Asteroids.Util.scalerMult(this.heading, params.radius),
                Asteroids.Util.normal(this.heading, 1)),
            Asteroids.Util.vecAdd(
                Asteroids.Util.scalerMult(this.heading, 1),
                Asteroids.Util.normal(this.heading, 1)),
            Asteroids.Util.vecAdd(
                Asteroids.Util.scalerMult(this.heading, 1),
                Asteroids.Util.normal(this.heading, -1)),
            Asteroids.Util.vecAdd(
                Asteroids.Util.scalerMult(this.heading, params.radius),
                Asteroids.Util.normal(this.heading, -1))
        ]
    }    

    Asteroids.Util.inherits(Laser, Bullet);

    
    
    Bullet.RADIUS = 2;
    Bullet.COLOR = 'white';
    Bullet.MUZZLE_SPEED = 8;
    Bullet.MAX_SPEED = 20;
    Bullet.MIN_SPEED = 8;

    Missile.MIN_SPEED = -1;
    Missile.ACCELERATION = 0.8;
    Missile.MAX_SPEED = 100;
    Missile.RADIUS = 10;
    Missile.COLOR = "#ff2222";

    Laser.SPEED = 40;
    Laser.RADIUS = 30;
    Laser.COLOR = '#22ff22';
})();
