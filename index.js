const fs = require('fs');
const Discord = require('discord.js');
const DisTube = require('distube')

const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync('db.json')
const db = low(adapter)

//load relevant data from config file, prefix and token are strings, alias is a JSON object
const { prefix, token, alias } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

const reactions = require('./utilities/reactions.js')
const levelling = require('./utilities/levelling.js')
const music = require('./utilities/music.js')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('the collapse of the world economy', { type: 'WATCHING' })

	// Add reactions to messages
    reactions.addReactions(client, alias)

	// Music utility action
    music.initialiseMusicInterface(db, client, alias)
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Add listener for giving roles from reactions
reactions.giveRoles(client, alias)

// Add listener for music reactions
music.distubeReactionListener(db, client, distube)

// Add listener for distube events
music.distubeEventHandler(db, distube, client, alias)

client.on('message', message => {

	// Cancel instruction if author is invalid or bot
    if(message.author.bot) return;
    if(message.author.username == undefined) return
    
    // Level calculation on each message
    levelling.levelsListener(client, db, message, prefix, alias)
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    if (message.channel.id != alias.botCommand) return //bot commands
    
    try {
	client.commands.get(command).execute(message, args, db, distube);
    } catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command');
    }
});

client.login(token);
