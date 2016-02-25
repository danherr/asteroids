(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

    var GameView = Asteroids.GameView =  function (game, ctx, menu) {
        this.game = game;
        this.game.end = this.endGame.bind(this);
        this.ctx = ctx;
        this.unPaused = false;
        this.menu = menu;
        this.step = 0;
        this.startMenu = new Asteroids.StartMenu({
            game: this.game,
            JQDomElement: $("#start-menu"),
            startGame: this.startGame,
        });

        $(".message").removeClass("display after-display");
        $(".message").addClass("before-display");
    };

    GameView.IMPULSE_SENSITIVITY = 2;

    GameView.prototype.start = function () {
        this.bindKeyHandlers();
        this.startMenu.reDrawMenu();
        this.startingMessage();
    };

    GameView.prototype.startGame = function (level) {
        this.game.resetGame(level);
        this.game.addInitialAsteroids();

        this.game.draw(this.ctx);
        this.game.step();

        this.interval = setInterval(function() {
            if (this.unPaused) {
                this.game.draw(this.ctx);
                this.game.step();
            }
        }.bind(this), 40);
    }

    GameView.prototype.endGame = function () {
        if (this.unPaused) {
            this.togglePause();
        }
        
        var message = $(".message-one");
        message.empty()

        message.append("<p> You Died. </p>");
        message.append("<p> Nothing to do but start over again. </p>");
        message.append('<figure id="start-menu" class="start-menu menu"></figure>');

        message.removeClass("after-display");
        message.removeClass("after-display-move");
        message.addClass("display");

        $(".side-bar").addClass("hideme");
        $(".asteroids-game-overlay").removeClass("hideme");

        this.startMenu.JQDomElement = $("#start-menu");
        
        this.startMenu.reDrawMenu();
        this.menu.reset();
        this.step = 2;
        clearInterval(this.interval);        
    }          


    GameView.prototype.startingMessage = function () {
        var message, lastMessage;
        
        if (this.step == 0) {
            message = $(".message-zero");            
        } else if (this.step == 1) {
            message = $(".message-one");
            lastMessage = $(".message-zero");            
        } else {
            lastMessage = $(".message-one");
        }
        
        if (message) {
            message.removeClass("before-display");
            message.addClass("display-move");
        }

        if (lastMessage) {
            lastMessage.removeClass("display-move");
            lastMessage.addClass("after-display-move");
        }

        this.step += 1;

        if (this.step >= 3) {
            this.playGame();

            setTimeout(function () {
                if (this.unPaused) {
                    $(".asteroids-game-overlay").addClass("hideme");
                }
                
                $(".side-bar").removeClass("hideme");
            }.bind(this), 2000);
        }
    };
    
    GameView.prototype.togglePause = function () {

        this.menu.selectedIdx = this.menu.selectedIdx || 0;

        var menuItem =  this.menu.menuData[this.menu.selectedIdx];
        this.unPaused = !this.unPaused;
        
        if (this.unPaused) {
            $(".asteroids-game-overlay").addClass("hideme")
            
            menuItem.selected = false;
            $("#" + menuItem.DomId).removeClass("selected");
        } else {            
            menuItem.selected = true;
            $("#" + this.menu.menuData[this.menu.selectedIdx].DomId).addClass("selected");

            $(".asteroids-game-overlay").removeClass("hideme");
        }
    }

    GameView.prototype.keyDown = function (event) {
        
        var ship = this.game.ship;
        switch(event.keyCode) {


        case 39:
            if (this.unPaused) {
                ship.right();
            } else {
                this.menu.right();
            }
            break;
        
        case 37:
            if (this.unPaused) {
                ship.left();
            } else {
                this.menu.left();
            }
            break;
            
        case 38:
            if (this.step <= 2) {
                this.startMenu.up();
            }else if (this.unPaused) {
                ship.up();
            } else {
                this.menu.up();
            }
            break;
            
        case 40:
            if (this.step <= 2) {
                this.startMenu.down();
            }else if (this.unPaused) {
                ship.down();
            } else {
                this.menu.down();
            }
            break;
        }
    };

    GameView.prototype.keyUp = function (event) {
      
        var ship = this.game.ship;

        if ( event.keyCode === 32 || event.keyCode === 16) {
            if (this.step > 2 && this.unPaused) {
                ship.fireBullet('w');
            }
        } else {
            if (this.step > 2 && this.unPaused) {
                ship.stop(event.keyCode);        
            }
        }
        
    };
    
    GameView.prototype.bindKeyHandlers = function () {
        var ship = this.game.ship;

        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
        
        key('p', function () {
            this.togglePause();
        }.bind(this));

        key('e', function () {
            if (!this.unPaused) {
                this.menu.equip();
            };
        }.bind(this));
    
        key('u', function () {
            if (!this.unPaused) {
                this.menu.unEquip();
            };
        }.bind(this));

        key('return', function () {
             if (this.step < 2) {
                this.startingMessage();
            } else if (this.step == 2) {

                $(".message-one").removeClass("display-move");
                $(".message-one").addClass("after-display-move");

                setTimeout(function () {
                    $(".side-bar").removeClass("hideme");
                }.bind(this), 1000);                

                this.step += 1;

                this.startGame( this.startMenu.level() );
                
            } else if (!this.unPaused) {
                this.menu.buy();
            }
        }.bind(this));
    };
    
    
})();
