(function () {
    var Asteroids = window.Asteroids = window.Asteroids || {};

    var ShipParams = Asteroids.ShipParams;
    
    var Menu = Asteroids.Menu = function (params) {
        this.game = params.game;
        this.JQDomElement = params.JQDomElement;
        this.nextMenu = params.nextMenu || this;
        this.prevMenu = params.prevMenu || this;
        
        this.inventory = this.initialInventory();
        this.shopItems = this.initialShopItems();
        this.changed = true;
        this.menuData = this.constructor.INITIAL_MENU_DATA;
 
        this.reBuildMenu();
    };

    Menu.prototype.reBuildMenu = function () {
        this.JQDomElement.empty();
        
        this.menuData.forEach( function (menuItem) {
            var description;

            if (typeof menuItem.owned === "boolean") {
                description = menuItem.owned ? menuItem.description[1] : menuItem.description[0];
            } else {
                description = menuItem.description[menuItem.owned];
            }
            
            var htmlString = "<p id=\""
                + menuItem.DomId
                + "\" class=\"menu-item "
                + (menuItem.selected ? "selected" : "")
                + "\" > "
                + menuItem.name
                + " <div class=\"description\"> "
                + description
                + " </div> </p>";
            
            this.JQDomElement.append(htmlString)

            
        }.bind(this))        
    }

    Menu.prototype.getOptions = function () {
        
    }

    Menu.prototype.initialShopItems = function () {
        return {};
    };

    Menu.prototype.initialInventory = function () {
        return {};
    };
   

    Menu.prototype.up = function () {
        debugger
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
        this.prevMenu.gainFocus(this.selectedIdx);
        this.loseFocus();
    };

    Menu.prototype.right = function () {
        this.nextMenu.gainFocus(this.selectedIdx);
        this.loseFocus();
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
    
    Menu.prototype.select = function () {
        
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
            cost: 40,
            costGrowth: 5,
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
            max: 4,
            type: "offsets",
            code: ShipParams.offsets.spread,
            cost: 40,
            costGrowth: 5,
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
            cost: 100,
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
            cost: 0
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
            cost: 100,
        },
        {
            name: "Laser",
            DomId: "laser",
            description: [
                "Professor Vectron's ray of ultradeath.  And at quite a markdown.",
                "Professor Vectron's ultradeath ray clears an Asteroid field pretty well."   
            ],
            equipped: false,
            owned: false,
            type: "projectile",
            code: Asteroids.Laser,
            cost: 500,
        }
        
        
        
    ]

    Asteroids.Util.inherits(WeaponMenu, Menu);



    
    var ShieldMenu = Asteroids.ShieldMenu = function (params) {
        Menu.call(this, params);
    }

    Asteroids.Util.inherits(ShieldMenu, Menu);
    
})();
