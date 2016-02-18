(function() {
    var Asteroids = window.Asteroids = window.Asteroids || {};
    var Util = Asteroids.Util;
    
    var MetaShip = window.MetaShip = {

        projectiles: [
            Asteroids.Bullet,
            Asteroids.Missile,
            Asteroids.Laser
        ],

        offsets {
            multi: [
                [
                    {
                        pos: function(heading) {
                            return Asteroids.Util.scalerMult(heading, 6);
                        },
                        headingRotation: 0,
                    },
                    {
                        pos: function(heading) {
                            return Asteroids.Util.scalerMult(heading, 6);
                        },
                        headingRotation: 0,
                    },
                    
                ],
                


            )();
