/**
 * Gets the frst Targeted character and enlarges it.
 */
 debugger;
 console.log("DTD Enlarge");
 let target = game.user.targets.values().next().value;
 if(target) {
	 let originalSize = target.data.width;
	 let mwak = target.actor.data.data.bonuses.mwak.damage;
	 
	 if (args[0] === "on") {
		 new Dialog({
			 title: "Enlarge or Reduce",
			 buttons: {
				 one: {
					 label: "Enlarge",
					 callback: () => {
						 let bonus = mwak + " 1d4";
						 let enlarge = (originalSize + 1);
						 target.actor.update({ "data.bonuses.mwak.damage": bonus });
						 target.update({ "width": enlarge, "height": enlarge });
						 target.actor.setFlag('world', 'enlageReduceSpell', {
							 size: originalSize,
							 ogMwak: mwak,
						 });
						 ChatMessage.create({ content: target.name + " is enlarged" });
					 }
				 },
				 two: {
					 label: "Reduce",
					 callback: () => {
						 let bonus = mwak + " -1d4";
						 let size = originalSize;
						 let newSize = (size > 1) ? (size - 1) : (size - 0.3);
						 target.actor.update({ "data.bonuses.mwak.damage": bonus });
						 target.update({ "width": newSize, "height": newSize });
						 target.actor.setFlag('world', 'enlageReduceSpell', {
							 size: originalSize,
							 ogMwak: mwak,
						 });
						 ChatMessage.create({ content: target.name + " is reduced" });
					 }
				 },
				 three: {
					 label: "Cancel",
					 callback: () => {
						 let flag = target.actor.getFlag('world', 'enlageReduceSpell');
						 let ogMwak = flag?.ogMwak || ""
						 target.actor.update({ "data.bonuses.mwak.damage": ogMwak || "" });
						 target.update({ "width": 1, "height": 1 });
						 target.actor.unsetFlag('world', 'enlageReduceSpell');
						 ChatMessage.create({ content: target.name + " Cleared" });
					 }
				 },
			 }
		 }).render(true);
	 }
	 if (args[0] === "off") {
		 let flag = target.actor.getFlag('world', 'enlageReduceSpell');
		 let ogMwak = flag?.ogMwak || "";
		 let size = flag?.size || 1
		 target.actor.update({ "data.bonuses.mwak.damage": ogMwak });
		 target.update({ "width": size, "height": size });
		 target.actor.unsetFlag('world', 'enlageReduceSpell');
		 ChatMessage.create({ content: target.name + " is returned to normal size" });
	 }
 }