(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

    var GameView = Asteroids.GameView =  function (game, ctx, menu) {
        this.game = game;
        this.ctx = ctx;
        this.unPaused = true;
        this.menu = menu;
        this.step = 0;

        $(".message").removeClass("display after-display");
        $(".message").addClass("before-display");
    };

    GameView.prototype.start = function () {
            this.bindKeyHandlers();            
            this.startingMessage();
    };

    GameView.prototype.playGame = function () {
        this.game.addInitialAsteroids();
        setInterval(function() {
            if (this.unPaused) {
                this.game.draw(this.ctx);
                this.game.step();
            }
        }.bind(this), 40);
    }

    GameView.IMPULSE_SENSITIVITY = 2;

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
            message.addClass("display");
        }

        if (lastMessage) {
            lastMessage.removeClass("display");
            lastMessage.addClass("after-display");
        }

        this.step += 1;

        if (this.step >= 3) {
            this.playGame();

            setTimeout(function () {
                if (this.unPaused) {
                    $(".asteroids-game-overlay").addClass("hideme");
                }
                
                $(".menu").removeClass("hideme");
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
            if (this.unPaused) {
                ship.up();
            } else {
                this.menu.up();
            }
            break;
            
        case 40:
            if (this.unPaused) {
                ship.down();
            } else {
                this.menu.down();
            }
            break;
        }
    };

    GameView.prototype.keyUp = function (event) {
      
        var ship = this.game.ship;


        switch(event.keyCode) {

        case 32:
            if (this.step <= 2) {
                this.startingMessage();
            } else if (this.unPaused) {
                ship.fireBullet('w');
            } else {
                this.menu.buy();
            }
            break;

        case 16:
            if (this.step <= 2) {
                this.startingMessage();
            } else if (this.unPaused) {
                ship.fireBullet('w');
            } else {
                this.menu.buy();
            }
            break;
        
        default:
            if (this.unPaused) {
                ship.stop(event.keyCode);        
            }
            break;
        }
        
    };
    
    GameView.prototype.bindKeyHandlers = function () {
        var ship = this.game.ship;

        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
        
        // key('left', function () {
        //     if (this.unPaused) {
        //        ship.left();
        //     } else {
        //         this.menu.left();
        //     }
        // }.bind(this));
        
        // key('right', function () {
        //     if (this.unPaused) {
        //        ship.right();
        //     } else {
        //         this.menu.right();
        //     }
        // }.bind(this));
        
        // key('up', function () {
        //     if (this.unPaused) {
        //        ship.up();
        //     } else {
        //         this.menu.up();
        //     }
        // }.bind(this));
        
        // key('down', function () {
        //     if (this.unPaused) {
        //        ship.down();
        //     } else {
        //         menu.down();
        //     }
        // }.bind(this));
        
        // key('w', function (){
        //     if (this.unPaused) {
        //         ship.fireBullet('w');
        //     } else {
        //         this.menu.select();
        //     }
        // }.bind(this));
        
        // key('space', function (){
        //     if (this.unPaused) {
        //         ship.fireBullet('w');
        //     } else {
        //         this.menu.buy();
        //     }
        // }.bind(this));
        
        // key('a', function (){
        //     if (this.unPaused) {
        //         ship.fireBullet('a');
        //     } else {
        //         this.menu.select();
        //     }
        // }.bind(this));
        
        // key('s', function (){
        //     if (this.unPaused) {
        //         ship.fireBullet('s');
        //     } else {
        //         this.menu.select();
        //     }
        // }.bind(this));
        
        // key('d', function (){
        //     if (this.unPaused) {
        //         ship.fireBullet('d');
        //     } else {
        //         this.menu.buy();
        //     }
        // }.bind(this));
        
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
    };
    
    
})();
