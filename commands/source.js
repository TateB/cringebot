const Discord = require('discord.js')

module.exports = {
	name: 'source',
	description: 'Provides the source code for the bot',
	execute(message, args) {
		const sourceEmbed = new Discord.MessageEmbed()
		.setColor('#FFA500')
		.setTitle("bot:cringe source")
		.setURL("https://github.com/TateB/cringebot")
		.setAuthor("taytems", message.client.users.cache.get("132399256525864961").displayAvatarURL(), "https://github.com/tateb")
		.setDescription("the bot's source code can be found at github")
		message.channel.send(sourceEmbed);
	},
};
