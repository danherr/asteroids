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
        }.bind(this), 40);
    };

  GameView.IMPULSE_SENSITIVITY = 2;

    GameView.prototype.togglePause = function () {
<<<<<<< HEAD
=======
        var menuItem =  this.menu.menuData[this.menu.selectedIdx];
>>>>>>> gh-pages
        this.unPaused = !this.unPaused;
        $(".instruction").empty();
        if (this.unPaused) {
            $(".instr-lr").append(" Left and Right to Turn ");
            $(".instr-ud").append(" Up to move ");
            $(".instr-shoot").append(" Space or W to Shoot ");
            $(".instr-pause").append(" P to Pause ");
            $(".instr-general").append(" Upgrade to Survive ");
            $(".instr-Jonathan").append(" You Can Do It! ");
<<<<<<< HEAD
        } else {
=======


            menuItem.selected = false;
            $("#" + menuItem.DomId).removeClass("selected");
        } else {
            
            menuItem.selected = true;
            $("#" + this.menu.menuData[this.menu.selectedIdx].DomId).addClass("selected");
            
            
>>>>>>> gh-pages
            $(".instr-lr").append(" Arrows navigate the Menus ");
            $(".instr-ud").append(" Space to Buy Something ");
            $(".instr-shoot").append(" E to Equip ");
            $(".instr-pause").append(" U to Unequip ");
            $(".instr-general").append(" P to Unpause ");
            $(".instr-Jonathan").append(" You Can Do It! ");
        }
    }

    GameView.prototype.keyDown = function (event) {
       
        var ship = this.game.ship;
        switch(event.keyIdentifier) {


        case "Right":
            if (this.unPaused) {
                ship.right();
            } else {
                this.menu.right();
            }
            break;
        
        case "Left":
            if (this.unPaused) {
                ship.left();
            } else {
                this.menu.left();
            }
            break;
            
        case "Up":
            if (this.unPaused) {
                ship.up();
            } else {
                this.menu.up();
            }
            break;
            
        case "Down":
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

        switch(event.keyIdentifier) {

        case "U+0020":
            if (this.unPaused) {
                ship.fireBullet('w');
            } else {
                this.menu.buy();
            }
            break;

        case "Control":
            if (this.unPaused) {
                ship.fireBullet('w');
            } else {
                this.menu.buy();
            }
            break;
        
        default:
            if (this.unPaused) {
                ship.stop(event.keyIdentifier);        
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
