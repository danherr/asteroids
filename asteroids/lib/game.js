(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Game = Asteroids.Game = function(width, height){
    this.width = width;
    this.height = height;
  };

  Game.prototype.start = function (canvas) {
    ctx = canvas.getContext("2d");

    var a = new Asteroids.Asteroid([100,200]);

    a.draw(ctx);
  };
})();
