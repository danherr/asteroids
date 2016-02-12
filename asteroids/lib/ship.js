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
        this.firing = 0;
        this.heading = [0 , 1];
        this.projectile = projectile || ShipParams.projectiles[0];
        this.offsets = offsets || ShipParams.offsets.start;
        this.gunTimeout = 5;
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
        this.firing = 5;
    };

    Ship.prototype.fireBullet = function (letter) {
        if (this.gunTimeout <= 0) {            
            this.multiShoot(this.projectile, this.offsets, this.heading);
            this.gunTimeout = 8;
        }
    };

    Ship.prototype.draw = function(ctx) {
        var heading = Asteroids.Util.direction(this.heading);
        var vertices = [0, 2.3, 3.92].map(function (angle) {
            return Asteroids.Util.vecAdd(
                this.pos,
                Asteroids.Util.transform(this.heading, angle, this.radius)
            );
        }.bind(this))

        ctx.lineWidth = 1;

        Asteroids.Util.drawPolygon(ctx, vertices, this.objectColor, this.strokeColor);

        ctx.lineWidth = 3;
        
        if (this.firing > 0) {

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

            this.firing -= 1;
        }

        if (this.gunTimeout > 0) this.gunTimeout -= 1;
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




    

    var AltShip = Asteroids.AltShip = function () {
        Ship.apply(this, arguments);
    };
    Asteroids.Util.inherits(AltShip, Ship);

    AltShip.TURNING_SENSITIVITY = 0.5;

    AltShip.prototype.left = function () {
        var direction = Asteroids.Util.direction(this.heading);
        direction = direction - AltShip.TURNING_SENSITIVITY;
        this.heading = Asteroids.Util.unitVec(direction);
    };

    AltShip.prototype.right = function () {
        var direction = Asteroids.Util.direction(this.heading);
        this.heading = Asteroids.Util.unitVec(direction + AltShip.TURNING_SENSITIVITY);
    };

    AltShip.prototype.up = function () {
        this.power(Asteroids.Util.scalerMult(this.heading, Ship.IMPULSE_SENSITIVITY));
    };

    AltShip.prototype.down = function () {
    };

    Ship.RADIUS = 10;
    Ship.COLOR = '#bbbbbb';
    Ship.IMPULSE_SENSITIVITY = 2;    
    
})();
