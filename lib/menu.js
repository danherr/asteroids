(function () {
    var Asteroids = window.Asteroids = window.Asteroids || {};

    var ShipParams = Asteroids.ShipParams;
    
    var Menu = Asteroids.Menu = function (params) {
        this.game = params.game;
        this.JQDomElement = params.JQDomElement;
        this.nextMenu = params.nextMenu || this;
        this.prevMenu = params.prevMenu || this;
        
        this.changed = true;
        this.menuData = this.constructor.INITIAL_MENU_DATA.map(function (object) {
            return $.extend({}, object);
        });
        this.selectedIdx = 0;
        
        this.reDrawMenu();
    };

    Menu.prototype.reset = function () {
        this.constructor(this);
    }

    Menu.prototype.reDrawMenu = function () {
        this.JQDomElement.empty();
        
        this.menuData.forEach( function (menuItem) {
            
            var htmlString = this.menuItemHTML(menuItem);
            this.JQDomElement.append($(htmlString))

            
        }.bind(this))        
    }

    Menu.prototype.reDrawMenuItem = function (menuItem) {
        $("#" + menuItem.DomId).empty();
        $("#" + menuItem.DomId).append(this.menuItemInnerHTML(menuItem));
    }

    Menu.prototype.menuItemHTML = function (menuItem) {
       var htmlText =  "<div id=\""
            + menuItem.DomId
            + "\" class=\"menu-item "
            + (menuItem.selected ? "selected" : "")
            + "\" > "
            + this.menuItemInnerHTML(menuItem);
            + " </div>";

        return htmlText;
    }

    Menu.prototype.menuItemInnerHTML = function (menuItem) {
        var description;
        var nameTag = "<p>" + menuItem.name;
        


        if (typeof menuItem.owned === "boolean") {
            description = menuItem.owned ? menuItem.description[1] : menuItem.description[0];
            
            if (menuItem.owned) nameTag += "";
        } else if (typeof menuItem.owned === "number" ){
            description = menuItem.description[menuItem.owned];
        } else {
            description = menuItem.description;
        }

        if (menuItem.equipped) nameTag += " <i class=\"fa-right fa fa-external-link-square\"></i> ";
        
        nameTag += "</p>";
        
        var description = nameTag
            + " <p class=\"description\"> "
            + description
            + " </p> ";
        var cost = "<p class=\"description cost \"> Cost: "
            + menuItem.cost
            + " </p>";

        if (menuItem.owned !== menuItem.top) {
            description += cost;
        }

        return description;
    }

    Menu.prototype.up = function () {
        
        $("#" + this.menuData[this.selectedIdx].DomId).removeClass("selected");
        this.selectedIdx -= 1;

        if (this.selectedIdx < 0) this.selectedIdx += this.menuData.length;

        $("#" + this.menuData[this.selectedIdx].DomId).addClass("selected");
    };

    Menu.prototype.down = function () {
        $("#" + this.menuData[this.selectedIdx].DomId).removeClass("selected");

        this.selectedIdx += 1;

        if (this.selectedIdx >= this.menuData.length) this.selectedIdx -= this.menuData.length;

        $("#" + this.menuData[this.selectedIdx].DomId).addClass("selected");        
    };

    Menu.prototype.left = function () {
        var selectedIdx = this.selectedIdx;

        this.loseFocus();
        
        this.prevMenu.gainFocus(selectedIdx);
    };

    Menu.prototype.right = function () {
        var selectedIdx = this.selectedIdx;
        
        this.loseFocus();
        
        this.nextMenu.gainFocus(selectedIdx);
    };

    Menu.prototype.loseFocus = function () {
        $("#" + this.menuData[this.selectedIdx].DomId).removeClass("selected");

        this.selectedIdx = null;
    };

    Menu.prototype.gainFocus = function (optionIdx) {
        optionIdx = optionIdx || 0;
        if (this.optionIdx >= this.menuData.length) this.optionIdx = this.menuData.length - 1;

        this.selectedIdx = optionIdx;
        $("#" + this.menuData[this.selectedIdx].DomId).addClass("selected");                
    };
    
    Menu.prototype.buy = function () {
        var menuItem = this.menuData[this.selectedIdx];

        if (menuItem.owned !== menuItem.top && this.game.moneys >= menuItem.cost) {
            this.game.moneys -= menuItem.cost;

            if (typeof menuItem.owned === "number") {
                menuItem.cost *= menuItem.costGrowth;
                menuItem.owned += 1;
            } else {
                menuItem.owned = true;                
            }

            this.equip(menuItem);
        }

        this.game.reportScore();
    };

    Menu.prototype.equip = function (menuItem) {
        menuItem = menuItem || this.menuData[this.selectedIdx];

        if (menuItem.owned) {
            this.menuData.filter(function (otherMenuItem) {
                return menuItem.type === otherMenuItem.type;
            }).forEach(this.unEquip.bind(this));

            
            var code = menuItem.code;
            if (typeof menuItem.owned === "number") {
                code = code[menuItem.owned];
            }
            this.game.ship.equipment[menuItem.type] = code;
            menuItem.equipped = true;
            this.reDrawMenuItem(menuItem);
        }
    };

    Menu.prototype.unEquip = function (menuItem) {
        menuItem = menuItem || this.menuData[this.selectedIdx];

        if (menuItem.equipped) {
            this.game.ship.equipment[menuItem.type] = menuItem.unCode;
            menuItem.equipped = false;
        }
        this.reDrawMenuItem(menuItem);        
    };

    var WeaponMenu = Asteroids.WeaponMenu = function (params) {
        Menu.call(this, params);
    }

    WeaponMenu.INITIAL_MENU_DATA = [
        {
            name: "Multi Shot",
            DomId: "multi-shot",
            description: [
                "Fires multiple shots in a cluster.",
                "Upgrade to add a third shot.",
                "Upgrade to fire a fourth clustered shot.",
                "The final upgrade yields five shots.",
                "Multi Shot is already at maximum."
            ],
            equipped: false,
            owned: 0,
            type: "offsets",
            code: ShipParams.offsets.multi,
            unCode: ShipParams.offsets.start,
            cost: 40,
            costGrowth: 5,
            top: 4,
            selected: true,
        },
        {
            name: "Spread Shot",
            DomId: "spread-shot",            
            description: [
                "Fires multiple shots that spread out.",
                "Upgrade to fire a third shot.",
                "Upgrade to add a fourth spreading shot.",
                "Final upgrade: Five shots.",
                "Spread Shot is already at maximum."
            ],
            equipped: false,
            owned: 0,
            type: "offsets",
            code: ShipParams.offsets.spread,
            unCode: ShipParams.offsets.start,            
            cost: 40,
            costGrowth: 5,
            top: 4,
        },
        {
            name: "GunnerBot",
            DomId: "gunnerbot",
            description: [
                "A cute robot to push the spacebar for you.",
                "It looks as much like Wall-E as copyright will allow."
            ],
            equipping: [
                "Equip the GunnerBot. You've pressed that key enough.",
                "Unequip GunnerBot and make it sad."
            ],
            owned: false,
            equipped: false,
            type: "gunner",
            code: true,
            unCode: false,
            cost: 100,
            top: true,
        },
        {
            name: "Gun Cooling",
            DomId: "firing-speed",            
            description: [
                "A better cooling system will let you shoot faster.",
                "Cooling level two.",
                "You'd need to be a robot to fire this fast.",
                "Your Gun is as fast as its going to get.",
            ],
            equipped: false,
            owned: 0,
            type: "gunTimeout",
            code: [10, 8, 6, 4],
            unCode: 10,
            cost: 50,
            costGrowth: 5,
            top: 3,
        },        
        {
            name: "Bullet",
            DomId: "bullet",
            description: [
                "If things are working, you shouldn't be seeing this message",
                "Bullets really aren't designed to destroy large rocks."
            ],
            equipped: true,
            owned: true,
            type: "projectile",
            code: Asteroids.Bullet,
            unCode: Asteroids.Bullet,            
            cost: 0,
            top: true,
        },
        {
            name: "Laser",
            DomId: "laser",
            description: [
                "Professor Vectron's ray of ultradeath.  And its on sale!",
                "Professor Vectron's ultradeath ray clears an Asteroid field pretty well."   
            ],
            equipped: false,
            owned: false,
            type: "projectile",
            code: Asteroids.Laser,
            unCode: Asteroids.Bullet,            
            cost: 200,
            top: true,
        },
        {
            name: "Missile",
            DomId: "missile",
            description: [
                "People have been using explosives to destroy rocks for generations.",
                "Heh Heh. Make 'em boom good."
            ],
            equipped: false,
            owned: false,
            type: "projectile",
            code: Asteroids.Missile,
            unCode: Asteroids.Bullet,            
            cost: 1000,
            top: true,
        },
    ]

    Asteroids.Util.inherits(WeaponMenu, Menu);



    
    var ShieldMenu = Asteroids.ShieldMenu = function (params) {
        Menu.call(this, params);
    }

    Asteroids.Util.inherits(ShieldMenu, Menu);


    var StartMenu = Asteroids.StartMenu = function (params) {
        Menu.call(this, params);
        this.startGame = params.startGame;
    }

    Asteroids.Util.inherits(StartMenu, Menu);
    
    StartMenu.INITIAL_MENU_DATA = [
        {
            name: "Normal",
            DomId: "normal",
            description: "You start the game with 300 moneys. Might I recommend the lasers?",
            code: function (game) {
                game.moneys = 300;
                game.difficulty = 1.4;
            },
            selected: true,
        },
        {
            name: "Easy",
            DomId: "easy",
            description: "You start the game with 1000 moneys. Is it still any sort of challenge?",
            code: function (game) {
                game.moneys = 1000;
            },
        },
        {
            name: "Hard",
            DomId: "hard",
            description: "You start the game with no money. Better earn some quick.",            
            code: function (game) {
                game.difficulty = 1.9;
            },
        },
        {
            name: "Impossible",
            DomId: "impossible",
            description:"You start the game with no money. Also: the asteroids are much stronger.",
            code: function (game) {
                game.difficulty = 3;
            },
        },    ]

    StartMenu.prototype.level = function () {
        return this.menuData[this.selectedIdx].code
    }
    

    
})();
