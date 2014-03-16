define(['app/action/action'], function(Action) {
	
	var G = require('app/graphics/graphics');
	
	var Fireball = function(options) {
		if(options) {
			this.target = options.target;
		}
	};
	Fireball.prototype = new Action();
	Fireball.constructor = Fireball;
	
	Fireball.prototype.doAction = function(entity) {
		entity.setPosture('aim', 500);
		var _this = this;
		setTimeout(function() {
			var angle = -entity.absHeadPos.r;
			var delta = -Math.sqrt(Math.pow(_this.target.p() - entity.absHeadPos.x, 2) + Math.pow(entity.absHeadPos.y, 2));
			entity.setPosture('shoot', 200);
			_this.projectile = G.make('dragonFireball').css({
				top: entity.absHeadPos.y,
				left: entity.absHeadPos.x,
				transform: 'rotate(' + angle + 'deg) translateX(0)'
			});
			G.addToWorld(_this.projectile);
			_this.projectile.css('left'); // Force redraw before animation
			_this.projectile.css('transform', 'rotate(' + angle + 'deg) translateX(' + delta + 'px)');
			
			setTimeout(function() {
				_this.projectile.remove();
				entity.action = null;
				console.log(entity.getFireballDamage());
				_this.target.takeDamage(entity.getFireballDamage());
			}, 300);
		}, 500);
	};

	return Fireball;
});