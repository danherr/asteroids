

Function.prototype.inherits = function (superClass) {
  var Surrogate = function () {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

// function MovingObject () {}
//
// function Ship () {}
// Ship.inherits(MovingObject);
//
// function Asteroid () {}
// Asteroid.inherits(MovingObject);
//
// MovingObject.prototype.moves = function () {console.log("moving now");};
//
// Asteroid.prototype.killsDinosaurs = function () {console.log("they're dead now");};
