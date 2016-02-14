(function () {
    window.Asteroids = window.Asteroids || {};
    var Asteroids = window.Asteroids;

    var Util = Asteroids.Util = {};

    Util.inherits = function (childClass, parentClass) {
        var Surrogate = function () {};
        Surrogate.prototype = parentClass.prototype;
        childClass.prototype = new Surrogate();
        childClass.prototype.constructor = childClass;
    };


    Util.drawPolygon = function (ctx, vertices, fill, stroke) {

        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineJoin = 'round';
        ctx.beginPath();

        ctx.moveTo(vertices[0][0], vertices[0][1]);

        for (var i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i][0], vertices[i][1]);
        }

        ctx.lineTo(vertices[0][0], vertices[0][1]);

        ctx.fill();
        ctx.stroke();
    }
        

    Util.randomVec = function(length) {
        var vec = [Math.random() - 0.5, Math.random() - 0.5];
        return Util.scaleTo(vec, length);
    };

    Util.vecLength = function(vec) {
        return Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2));
    };

    Util.normalize = function(vec) {
        return Util.scaleTo(vec, 1);
    };

    Util.scalerMult = function(vec, scaler) {
        return [vec[0] * scaler, vec[1] * scaler];
    };

    Util.randomInRange = function (start, end) {
        return start + (Math.random() * (end - start));
    };

    Util.vecAdd = function (vec1, vec2) {
        return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
    };

    Util.vecSub = function (vec1, vec2) {
        return Util.vecAdd(vec1, Util.scalerMult(vec2, -1));
    };

    Util.metric = function (point1, point2) {
        return Util.vecLength(Util.vecSub(point1, point2));
    };

    Util.direction = function (vec) {
        direc = Math.atan(vec[1]/vec[0]);
        if (vec[0] < 0) {
            direc += Math.PI;
        }
        return direc;
    };

    Util.unitVec = function(direction){
        return [Math.cos(direction), Math.sin(direction)];
    };

    Util.makeVec = function(direction, length) {
        return [Math.cos(direction) * length, Math.sin(direction) * length];
    }

    Util.innerProd = function (vec1, vec2) {
        return (vec1[0] * vec2[0]) + (vec1[1] * vec2[1]);
    }

    Util.scalerProject = function (from, onto) {
        return Util.innerProd(from, onto) / Util.vecLength(onto);
    };


    Util.theyCollide = function (myVertices, otherVertices) {

        var norms = Util.normals(myVertices).concat(Util.normals(otherVertices));
       
        for( var i = 0 ; i < norms.length ; i++) {
            if (Util.checkSeparation(myVertices, otherVertices, norms[i])) return false;
        }

        return true;
    }

    Util.normals = function (vertices) {
        var norms = [Util.normal(Util.vecSub(vertices[0], vertices[vertices.length - 1]))];

        for (var i = 1 ; i < vertices.length ; i++) {
            norms.push(Util.normal(Util.vecSub(vertices[i], vertices[i - 1])));
        }

        return norms;
    }

    Util.checkSeparation = function (vertices1, vertices2, normal) {
        var max = function (x,y) {return Math.max(x,y)};
        var min = function (x,y) {return Math.min(x,y)};

        var proj1 = vertices1.map(function (vertex) {
            return Util.scalerProject(vertex, normal)
        })

        var proj2 = vertices2.map(function (vertex) {
            return Util.scalerProject(vertex, normal)
        })

        return (proj1.reduce(min) > proj2.reduce(max)) ||
            (proj1.reduce(max) < proj2.reduce(min));
    }

    Util.normal = function (vec, scaling) {
        scaling = scaling || 1;
        return [vec[1] * scaling, -vec[0] * scaling];
    }

    Util.rotate = function (vec, angle) {
        var length = Util.vecLength(vec);
        return Util.transform(vec, angle, length);
    };

    Util.transform = function (vec, angle, length) {
       var direction = Util.direction(vec);
       direction += angle;
       return Util.makeVec(direction, length);        
    }

    Util.scaleTo = function (vec, length) {
        return Util.scalerMult(vec, length / Util.vecLength(vec));
    }

})();
