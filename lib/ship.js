(function () {
    var Asteroids = window.Asteroids = window.Asteroids || {};
    var MovingObject = Asteroids.MovingObject;
    var ShipParams = Asteroids.ShipParams

    var Ship = Asteroids.Ship = function (pos, game, offsets, projectile) {
        MovingObject.call(this, {
            pos: pos,
            vel: [0,0],
            radius: Ship.RADIUS,
            objectColor: Ship.COLOR,
            game: game
            
        });
        this.Enginesfiring = 0;
        this.heading = [0 , 1];
        this.gunTimeout = 5;
        this.equipment = {
            projectile: projectile || ShipParams.projectiles[0],
            offsets: offsets || ShipParams.offsets.start,
            gunTimeout: 10,
        }
        this.vertices = [0, 2.3, 3.92].map(function (angle) {
            return Asteroids.Util.transform(this.heading, angle, this.radius);
        }.bind(this))
    };

    Asteroids.Util.inherits(Ship, MovingObject);

    Ship.prototype.relocate = function () {
        this.pos = this.game.shipStartPosition();
        this.vel = [0,0];
        this.heading = [0,1];
    };

    Ship.prototype.power = function (impulse) {
        this.heading = Asteroids.Util.normalize(impulse);
        this.vel = Asteroids.Util.vecAdd(this.vel, impulse);
        this.enginesFiring = 5;
    };

    Ship.prototype.fireBullet = function (letter) {
        if (this.gunTimeout <= 0) {            
            this.multiShoot(this.equipment.projectile, this.equipment.offsets, this.heading);
            this.gunTimeout = this.equipment.gunTimeout;
        }
    };

    Ship.prototype.draw = function(ctx) {
        var heading = Asteroids.Util.direction(this.heading);

        this.vertices = [0, 2.3, 3.92].map(function (angle) {
            return Asteroids.Util.transform(this.heading, angle, this.radius);
        }.bind(this))
        
        var vertices = this.absVertices();

        ctx.lineWidth = 1;

        Asteroids.Util.drawPolygon(ctx, vertices, this.objectColor, this.strokeColor);

        ctx.lineWidth = 3;
        
        if (this.enginesFiring > 0) {

            ctx.strokeStyle = 'yellow';


            ctx.beginPath();
            ctx.arc(
                this.pos[0],
                this.pos[1],
                this.radius + 0.5,
                heading  - Math.PI - 0.5,
                heading  - Math.PI - 0.3,
                false
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(
                this.pos[0],
                this.pos[1],
                this.radius + 0.3,
                heading  - Math.PI + 0.5,
                heading  - Math.PI + 0.3,
                true
            );
            ctx.stroke();

            this.enginesFiring -= 1;
        }

    };

    Ship.prototype.left = function () {
        this.power([-1 * Ship.IMPULSE_SENSITIVITY,0]);
    };

    Ship.prototype.right = function () {
        this.power([1 * Ship.IMPULSE_SENSITIVITY,0]);
    };

    Ship.prototype.up = function () {
        this.power([0, -1 * Ship.IMPULSE_SENSITIVITY]);
    };

    Ship.prototype.down = function () {
        this.power([0, 1 * Ship.IMPULSE_SENSITIVITY]);
    };

    Ship.prototype.multiShoot = function (projectile, offsets, heading) {
        offsets.forEach(function (offset) {
            this.game.bullets.push(new projectile({
                pos: Asteroids.Util.vecAdd(this.pos, offset.pos(heading)),
                shipVel: this.vel,
                game: this.game,
                heading: Asteroids.Util.rotate(heading, offset.headingRotation)
            }));

        }.bind(this))
    };

    Ship.prototype.act = function () {};


    

    var AltShip = Asteroids.AltShip = function () {
        Ship.apply(this, arguments);

        this.turning = 0;
        this.moving = 0;
    };
    Asteroids.Util.inherits(AltShip, Ship);

    AltShip.TURNING_SENSITIVITY = 0.1;

    AltShip.prototype.act = function () {
       
        if (this.gunTimeout > 0) this.gunTimeout -= 1;
        if (this.equipment.gunner) this.fireBullet();

        var direction = Asteroids.Util.direction(this.heading);
        
        direction = direction + (this.turning * AltShip.TURNING_SENSITIVITY);
        this.heading = Asteroids.Util.unitVec(direction);


        if (this.moving > 0) {
            this.power(Asteroids.Util.scalerMult(
                this.heading,
                (this.moving * Ship.IMPULSE_SENSITIVITY)
            ));
        }
    }

    AltShip.prototype.left = function () {
        this.turning = - 1;
    };

    AltShip.prototype.right = function () {
        this.turning = 1;
    };

    AltShip.prototype.up = function () {
        this.moving = 1;
    };

    AltShip.prototype.stop = function (keyCode) {
        if (keyCode == 39 || keyCode == 37){
            this.turning = 0;
        } else if (keyCode == 38) {
            this.moving = 0;
        }
    }

    AltShip.prototype.down = function () {
    };

    Ship.RADIUS = 10;
    Ship.COLOR = '#bbbbbb';
    Ship.IMPULSE_SENSITIVITY = 0.5;    
    
})();
