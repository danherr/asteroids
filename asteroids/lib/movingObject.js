(function () {
    window.Asteroids = window.Asteroids || {};
    var Asteroids = window.Asteroids;

    var MovingObject = window.Asteroids.MovingObject = function(params) {
        this.pos = params.pos || [0,0];
        this.vel = params.vel || [0,1];
        this.radius = params.radius || 5;
        this.objectColor = params.objectColor || 'black';
        this.strokeColor = params.strokeColor || 'white';
        this.game = params.game;
        this.heading = [0,1];
        this.vertices = params.vertices || [];
    };

    MovingObject.randomVertices = function (num, length) {
        var directions = [];
        for (var i = 0; i < num; i++){
            directions.push(Math.random() * 2 * Math.PI)
        }
        directions = directions.sort();
        return directions.map(function (direction) {
            var vec = Asteroids.Util.unitVec(direction);
            vec = Asteroids.Util.scalerMult(vec, length);
            if (Math.random() < 0.4) {
                vec = Asteroids.Util.scalerMult(vec, 0.7);
            }
            return vec;
        });
    }

    MovingObject.prototype.draw = function(ctx) {
        var vertices = this.vertices.map(function (vertex) {
            return Asteroids.Util.vecAdd(this.pos, vertex)
        }.bind(this));

        
        ctx.fillStyle = this.objectColor;
        ctx.strokeStyle = this.objectColor;
        ctx.beginPath();

        ctx.moveTo(vertices[0][0], vertices[0][1]);

        for (var i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i][0], vertices[i][1]);
        }

        ctx.fill();
        ctx.stroke();
        
    };

    
    MovingObject.prototype.move = function() {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.pos = this.game.wrap(this.pos, this.radius);
    };

    MovingObject.prototype.isCollideWith = function (otherObject) {
        return Asteroids.Util.metric(this.pos, otherObject.pos) <= (this.radius + otherObject.radius);
    };

    MovingObject.prototype.collideWith = function (otherObject) {
    };

})();
