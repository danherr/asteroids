(function() {
    var Asteroids = window.Asteroids = window.Asteroids || {};

    var makeOffset = function (headingOffset, normalOffset, rotation) {
        return {
            pos: function(heading) {
                return Asteroids.Util.vecAdd(
                    Asteroids.Util.scalerMult(heading, headingOffset),
                    Asteroids.Util.normal(heading, normalOffset));
            },
            headingRotation: rotation,
        }        
    }
    
    var ShipParams = Asteroids.ShipParams = {

        projectiles: [
            Asteroids.Bullet,
            Asteroids.Missile,
            Asteroids.Laser
        ],

        offsets: {
            start: [ makeOffset(6,0,0) ],
            multi:
            [
                [ makeOffset(6,0,0) ],
                [
                    makeOffset(3,3,0),
                    makeOffset(3,-3,0)
                ],
                [
                    makeOffset(0,6,0),
                    makeOffset(6,0,0),
                    makeOffset(0,-6,0)
                ],
                [
                    makeOffset(3,3,0),
                    makeOffset(3,-3,0),
                    makeOffset(0,8,0),
                    makeOffset(0,-8,0)
                ],
                [
                    makeOffset(6,0,0),
                    makeOffset(3,4,0),
                    makeOffset(3,-4,0),
                    makeOffset(0,8,0),
                    makeOffset(0,-8,0)                    
                ]
            ],
            spread:
            [
                [ makeOffset(6,0,0) ],
                [
                    makeOffset(3,3,-0.1),
                    makeOffset(3,-3,0.1)
                ],
                [
                    makeOffset(0,6,-0.1),
                    makeOffset(6,0,0),
                    makeOffset(0,-6,0.1)
                ],
                [
                    makeOffset(3,3,-0.1),
                    makeOffset(3,-3,0.1),
                    makeOffset(0,8,-0.25),
                    makeOffset(0,-8,0.25)
                ],
                [
                    makeOffset(6,0,0),
                    makeOffset(3,4,-0.15),
                    makeOffset(3,-4,0.15),
                    makeOffset(0,8,-0.3),
                    makeOffset(0,-8,0.3)                    
                ]
            ],            
            
        }
    };

})();
