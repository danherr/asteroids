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

  Util.randomVec = function(length) {
    var vec = [Math.random() - 0.5, Math.random() - 0.5];
    return Util.scalerMult(vec, length / Util.vecLength(vec));
  };

  Util.vecLength = function(vec) {
    return Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2));
  };

  Util.normalize = function(vec) {
    var length = Util.vecLength(vec);
    return [vec[0] / length, vec[1] / length];
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

  Util.metric = function (vec1, vec2) {
    return Util.vecLength(Util.vecSub(vec1,vec2));
  };

})();
