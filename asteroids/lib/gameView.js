(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var GameView = Asteroids.GameView =  function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.game.addAsteroids();
    this.bindKeyHandlers();
    setInterval(function() {
      this.game.draw(this.ctx);
      this.game.step();
    }.bind(this), 20);
  };

  GameView.IMPULSE_SENSITIVITY = 2;

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('left', function() {
      ship.left();
    });
    key('right', function() {
      ship.right();
    });
    key('up', function() {
      ship.up();
    });
    key('down', function() {
      ship.down();
    });
    key('space', function(){
      ship.fireBullet();
    });
  };


})();
