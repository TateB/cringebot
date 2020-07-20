const Discord = require('discord.js');

module.exports = {
	name: 'level',
	description: "Gets the user's level",
	execute(message, args, db) {
		let dbUser = db.get("users").get(message.author)
		const embed = new Discord.MessageEmbed()
		.setTitle(`${message.author.username}'s Stats`)
		.setThumbnail(message.author.displayAvatarURL())
		.addFields(
			{ name: "Level", value: `${dbUser.get("level").value()}` },
			{ name: "XP", value: `${dbUser.get("xp").value()} **/** ${dbUser.get("nextLevelXp").value()}` }
		)
		.setTimestamp()

		message.channel.send(embed)
	},
};
