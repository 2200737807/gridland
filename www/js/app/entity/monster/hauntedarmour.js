define(['app/entity/monster/monster', 'app/action/actionfactory'], 
		function(Monster, ActionFactory) {
	
	var HauntedArmour = function(options) {
		this.options = $.extend({}, this.options, {}, options);
		this.hp(this.maxHealth());
		this.xp = 2;
	};
	HauntedArmour.prototype = new Monster({
		monsterClass: 'hauntedArmour',
		speed: 80
	});
	HauntedArmour.constructor = HauntedArmour;
	
	HauntedArmour.prototype.think = function() {
		var _this = this;
		var World = require('app/world');
		if(_this.isIdle() && _this.isAlive() && _this.action == null) {
			if(!_this.attackRange(World.getDude())) {
				_this.action = ActionFactory.getAction("MoveTo", {
					target: World.getDude()
				});
			} else {
				_this.action = ActionFactory.getAction("Attack", {
					target: World.getDude()
				});
			}
			if(_this.action != null) {
				_this.action.doAction(_this);
				return true;
			}
		}
		return false;
	};
	
	HauntedArmour.prototype.maxHealth = function() {
		return 9;
	};
	
	HauntedArmour.prototype.getDamage = function() {
		return 1;
	};
	
	HauntedArmour.prototype.getHitboxWidth = function() {
		return 20;
	};
	
	return HauntedArmour;
});