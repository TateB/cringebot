const Discord = require('discord.js');

module.exports = {
	name: 'leaderboard',
	description: "Gets the server's leaderboard",
	execute(message, args, db) {
		let dbUser = db.get("users").get(message.author)
		
		// Leaderboard embed
		const leaderboardEmbed = new Discord.MessageEmbed()
		.setColor('#FFA500')
		.setTitle("sector:cringe leaderboard")
		.setThumbnail(message.guild.iconURL())
		var counter = 1 
		db.get("users").sortBy("xp").take(5).value().reverse().forEach(e => {
			var username = message.client.users.cache.get(e.id)
			if (username == undefined) {
				return
			} else {
				username = username.username
			}

			
			leaderboardEmbed.addField(`**${counter}**. @${username}`, `**level**: ${e.level}, **xp**: ${e.xp}`, false)	
			counter++
		})

		
		console.log(db.get("users").sortBy("xp").value())
		message.channel.send(leaderboardEmbed)
	},
};
