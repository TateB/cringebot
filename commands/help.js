let Discord = require('discord.js')

module.exports = {
	name: 'help',
    description: 'Ding!',
    usage: '!help <command>',
	execute(message, args) {
        const { commands } = message.client
        const embed = new Discord.MessageEmbed()

        if (!args.length) {
            embed.setTitle("commands:")
            embed.setDescription(commands.map(cmd => cmd.name).join("\n"))
        } else if (commands.find(cmd => cmd.name == args[0])) {
            let foundCommand = commands.find(cmd => cmd.name == args[0])

            embed.setTitle(`${foundCommand.name}`)
            embed.setDescription(`${foundCommand.description}\n**usage:** ${foundCommand.usage}`)

            if(foundCommand.permissionsRequired) {
                embed.setFooter(`permissions required: ${foundCommand.permissionsRequired}`)
            }
        } else {
            embed.setTitle(`No command found for ${args[0]}`)
        }

        message.channel.send(embed)
	}, 
};
