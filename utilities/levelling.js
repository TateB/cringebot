function levelsListener(client, db, message, prefix) {
    if (db.get("users").get(message.author).value() == undefined) {
		var dbUser = db.get("users").get(message.author)
		console.log("dbuser is undefined")
		db.get("users")
		.set(message.author, { "level": 0, "xp": 20, nextLevelXp: 100, msSinceLastXp: 1595223500000, id: message.author.id })
		.write()
		return;
	}

	if (!message.content.startsWith(prefix) || message.channel != "734371349358837782" ) {	
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
			client.channels.cache.get("734422195203211287").send(`${message.author.username} has reached level **${currentNewLevel}**`)
			
			currentNewLevel = currentNewLevel+1
			let newXp = 5*(Math.pow(currentNewLevel, 2)) + 50 * currentNewLevel + 100
			console.log(newXp, currentNewLevel)
			dbUser.set("nextLevelXp", newXp).write()
		}

		return
	}
}

module.exports = {
    levelsListener
}