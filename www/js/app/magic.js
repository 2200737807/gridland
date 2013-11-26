define(['app/eventmanager', 'app/gamestate', 'app/gamecontent'], function(E, State, Content) {
	
	var MANA_COST = 3;
	
	function castSpell(spellName) {
		State.mana -= MANA_COST;
		E.trigger('updateMana', [State.mana, State.maxMana()]);
		Content.Spells[spellName].onUse();
	}
	
	return {
		init: function() {
			E.bind("castSpell", castSpell);
		}
	};
});