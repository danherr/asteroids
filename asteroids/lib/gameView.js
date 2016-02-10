(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

    var GameView = Asteroids.GameView =  function (game, ctx, menu) {
        this.game = game;
        this.ctx = ctx;
        this.unPaused = true;
        this.menu = menu;
    };

    GameView.prototype.start = function () {
        this.game.addInitialAsteroids();
        this.bindKeyHandlers();
        setInterval(function() {
            if (this.unPaused) {
                this.game.draw(this.ctx);
                this.game.step();
            }
        }.bind(this), 30);
    };

  GameView.IMPULSE_SENSITIVITY = 2;

    GameView.prototype.togglePause = function () {
        this.unPaused = !this.unPaused;
    }
    
    GameView.prototype.bindKeyHandlers = function () {
        var ship = this.game.ship;
        key('left', function () {
            if (this.unPaused) {
               ship.left();
            } else {
                this.menu.left();
            }
        }.bind(this));
        key('right', function () {
            if (this.unPaused) {
               ship.right();
            } else {
                this.menu.right();
            }
        }.bind(this));
        key('up', function () {
            if (this.unPaused) {
               ship.up();
            } else {
                this.menu.up();
            }
        }.bind(this));
        key('down', function () {
            if (this.unPaused) {
               ship.down();
            } else {
                menu.down();
            }
        }.bind(this));
        key('space', function (){
            if (this.unPaused) {
                ship.fireBullet();
            } else {
                this.menu.select();
            }
        }.bind(this));
        key('p', function () {
            this.togglePause();
        }.bind(this));
    };
    
    
})();
