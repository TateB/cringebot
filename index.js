const fs = require('fs');
const Discord = require('discord.js');

const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync('db.json')
const db = low(adapter)

const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const reactions = require('./utilities/reactions.js')
const levelling = require('./utilities/levelling.js')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', () => {
	console.log('Ready!');
	reactions.addReactions(client)
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

reactions.giveRoles(client)


client.on('message', message => {
	if(message.author.bot) return;
	if(message.author.username == undefined) return
	// Level calculation on each message
	levelling.levelsListener(client, db, message, prefix)

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, db);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
