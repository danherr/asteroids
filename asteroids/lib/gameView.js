(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var GameView = Asteroids.GameView =  function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.game.addAsteroids();

    setInterval(function() {
      this.game.draw(this.ctx);
      this.game.moveObjects();
    }.bind(this), 20);
  };


})();
