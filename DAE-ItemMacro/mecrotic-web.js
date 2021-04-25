
/*  Crate an new Item.
	Uses DAE and Item Macro
	DAE - Duration turns 100
	Macro Repeat - Start of each turn
	Effect Macro.itemMacro Custom 0
	Set Item Macro to the below Script
	Drag Item onto character when webbed.
*/

let roll = new Roll(`2d8`).roll();

let results_html = `Agghhh this Web Burns! It burns my soul!!!
You struggle in the Necrotic Web taking ${roll.total}[necrotic] damage`;

if(args[0] == "each" || args[0] == "on" || args[0] == "off") {
	actor = game.actors.get(args[2]?.actorId);
}

if(actor) {
	if(args[0] !== "off") {
		let hp = actor.data.data.attributes.hp.value - roll.total;
		let deathSaves = actor.data.data.attributes.death.failure;
	
		if(actor.data.data.attributes.hp.value <= 0) {
			hp = 0;
			deathSaves = deathSaves + 1;
			results_html = `You moan in your unconscious state as the life is pulled from you...`;
		} 	
		if(actor.data.data.attributes.death.failure >= 3) {
			results_html = `${actor.data.name} lies eerily still...`;
			hp = 0;
			deathSaves = 3;
		}
		actor.update({  
						"data.attributes.hp.value": hp,
						"data.attributes.death.failure": deathSaves
					});
	
		ChatMessage.create({
			user: game.user._id,
			speaker: ChatMessage.getSpeaker({token: actor}),
			content: results_html
		});
	} else {
		// Removed the Necrotic Web.
		let nw = actor.items.find(entry => entry.data.name === "Necrotic Web");
		if(nw) {
			nw.delete();
		}
	}
}
