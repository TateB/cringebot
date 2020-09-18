function addLevelRole(message, currentNewLevel) {
	let newRole = message.guild.roles.cache.find(role => role.name === `level ${currentNewLevel}`)
	if (newRole != undefined) {
		message.member.roles.add(newRole)
	}
}

function levelsListener(client, db, message, prefix, alias) {
    if (db.get("users").get(message.author).value() == undefined) {
		var dbUser = db.get("users").get(message.author)
		db.get("users")
		.set(message.author, { "level": 0, "xp": 20, nextLevelXp: 100, msSinceLastXp: 1595223500000, id: message.author.id })
		.write()
		return;
	}

	if (!message.content.startsWith(prefix) || message.channel != alias.channels.botCommands ) {	
		// Re-establish updated user
		dbUser = db.get("users").get(message.author)

		// Add xp to user if over a minute has passed since last xp
		let date = new Date()
		if ((date.getTime() - dbUser.get("msSinceLastXp").value()) > 60000) { 
			dbUser.update("xp", n => n + (Math.floor(Math.random() * 8)+18)).write()
			dbUser.set("msSinceLastXp", date.getTime()).write()
		}

		// Re-establish updated user
		dbUser = db.get("users").get(message.author)

		// If nextLevelXp == currentXp, levelup
		if (dbUser.get("xp").value() >= dbUser.get("nextLevelXp").value()) {
			dbUser.update("level", n => n+1 ).write()
			var currentNewLevel = dbUser.get("level").value()
			client.channels.cache.get(alias.channels.levelUps).send(`${message.author.username} has reached level **${currentNewLevel}**`)

			addLevelRole(message, currentNewLevel)
			
			currentNewLevel = currentNewLevel+1
			let newXp = 10*(Math.pow(currentNewLevel, 2)) + 50 * currentNewLevel + 100
			dbUser.set("nextLevelXp", newXp).write()
		}

		return
	}
}

module.exports = {
    levelsListener
}
