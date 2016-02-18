(function () {
    window.Asteroids = window.Asteroids || {};
    var Asteroids = window.Asteroids;

    var MovingObject = window.Asteroids.MovingObject = function(params) {
        this.pos = params.pos || [0,0];
        this.vel = params.vel || [0,1];
        this.radius = params.radius || 5;
        this.innerRadius = params.innerRadius || this.radius * 0.3;
        this.objectColor = params.objectColor || 'black';
        this.strokeColor = params.strokeColor || 'white';
        this.game = params.game;
        this.heading = params.heading || [0,1];
        this.vertices = params.vertices || [];
        if (params.vertices) {
            this.lengths = params.vertices.map(Asteroids.Util.vecLength);
            this.directions = params.vertices.map(Asteroids.Util.direction);
        } else {
            this.lengths = [];
            this.directions = [];
        }
        this.absVertexCache = {};
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
                 vec = Asteroids.Util.scalerMult(vec, 0.8);
             }
            return vec;
        });
       
    }

    MovingObject.prototype.edges = function () {
        var output = [];
        
        if (this.vertices.length >= 2) {
            for (var i = 1; i < this.vertices.length; i++) {
                output.push([this.vertices[i-1], this.vertices[i]]);
            };

            output.push([
                this.vertices[this.vertices.length - 1],
                this.vertices[0]
            ]);
        }

        return output;
    };

    MovingObject.prototype.draw = function(ctx) {
        var vertices = this.vertices.map(function (vertex) {
            return Asteroids.Util.vecAdd(this.pos, vertex)
        }.bind(this));

        Asteroids.Util.drawPolygon(ctx, vertices, this.objectColor, this.strokeColor)

    };

    
    MovingObject.prototype.move = function() {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.pos = this.game.wrap(this.pos, this.radius);
    };

    MovingObject.prototype.isCollideWith = function (otherObject) {
        var distance = Asteroids.Util.metric(this.pos, otherObject.pos);
        if (distance <= (this.radius + otherObject.radius)) {
            if (distance <= this.innerRadius + otherObject.innerRadius) return true;
            
            return Asteroids.Util.theyCollide(this.absVertices(), otherObject.absVertices());
        }
                                             
        return false;
    };

    MovingObject.prototype.absVertices = function () {
        if (this.absVertexCache.pos !== this.pos) {
            this.absVertexCache.vertices = this.vertices.map( function (vertex) {
                return Asteroids.Util.vecAdd(this.pos, vertex);
            }.bind(this));
        } else {
            debugger
        }

        return this.absVertexCache.vertices;
    }

    MovingObject.prototype.collideWith = function (otherObject) {
    };

})();
