const Discord = require('discord.js');

module.exports = {
	name: 'level',
	description: "Gets the user's level",
	usage: '!level <usage>',
	execute(message, args, db) {
		var specifiedUser = message.author

		// if there is a mentioned user 
		if (message.mentions.users.first() != undefined) {
			specifiedUser = message.mentions.users.first()
		}


		let dbUser = db.get("users").get(specifiedUser)
		const embed = new Discord.MessageEmbed()
		.setTitle(`${specifiedUser.username}'s Stats`)
		.setThumbnail(specifiedUser.displayAvatarURL())
		.addFields(
			{ name: "Level", value: `${dbUser.get("level").value()}` },
			{ name: "XP", value: `${dbUser.get("xp").value()} **/** ${dbUser.get("nextLevelXp").value()}` }
		)
		.setTimestamp()

		message.channel.send(embed)
	},
};
