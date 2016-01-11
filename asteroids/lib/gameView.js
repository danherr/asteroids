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
    var game = this.game;
    key('left', function() {
      game.ship.power([-1 * GameView.IMPULSE_SENSITIVITY,0]);
    });
    key('right', function() {
      game.ship.power([1 * GameView.IMPULSE_SENSITIVITY,0]);
    });
    key('up', function() {
      game.ship.power([0,-1 * GameView.IMPULSE_SENSITIVITY]);
    });
    key('down', function() {
      game.ship.power([0,1 * GameView.IMPULSE_SENSITIVITY]);
    });
  };


})();
