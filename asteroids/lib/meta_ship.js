(function() {
    var Asteroids = window.Asteroids = window.Asteroids || {};

    var MetaShip = {

        projectiles: [
            Asteroids.Bullet,
            Asteroids.Missile,
            Asteroids.Laser
        ],

        firingPattern {
            multi: [
                function (params, projectile) {
                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, 6))

                    this.game.bullets.push(new projectile(params));     

                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, -6))
                    
                    this.game.bullets.push(new projectile(params));
                },

                function (params, projectile) {
                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, 6))

                    this.game.bullets.push(new projectile(params));     

                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, -6))
                    
                    this.game.bullets.push(new projectile(params));

                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.scalerMult(heading, 6))
                    
                    this.game.bullets.push(new projectile(params));
                    
                },

                function (params, projectile) {
                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, 3))

                    this.game.bullets.push(new projectile(params));     

                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, -3))
                    
                    this.game.bullets.push(new projectile(params));
                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, 8))

                    this.game.bullets.push(new projectile(params));     

                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, -8))
                    
                    this.game.bullets.push(new projectile(params));
                    
                },

                function (params, projectile) {
                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.scalerMult(heading, 6))
                    
                    this.game.bullets.push(new projectile(params));
                    
                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, 5))

                    this.game.bullets.push(new projectile(params));     

                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, -5))
                    
                    this.game.bullets.push(new projectile(params));
                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, 10))

                    this.game.bullets.push(new projectile(params));     

                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, -10))
                    
                    this.game.bullets.push(new projectile(params));
                    
                },
                
            ],
            spread: [
                function (params, projectile) {

                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, 6))

                    params.heading = Asteroids.Util.rotate(params.heading, 0.2)


                    this.game.bullets.push(new projectile(params));     

                    params.pos = Asteroids.Util.vecAdd(
                        params.pos,
                        Asteroids.Util.normal(heading, -6))

                    params.heading = Asteroids.Util.rotate(params.heading, -0.2)
                    
                    this.game.bullets.push(new projectile(params));
                        pos: Asteroids.Util.vecAdd(this.pos, Asteroids.Util.normal(heading, -6)),
                        shipVel: this.vel,
                        game: this.game,
                    }));        
                };

                },
                function (params, projectile) {
                    
                },
                function (params, projectile) {
                    
                },
                function (params, projectile) {
                    
                },
                
            ]                
        }
        
    }

})();
