module.exports = {
	name: 'ding',
	description: 'Ding!',
	usage: '!ding',
	execute(message, args) {
		message.channel.send('Dong.');
	},
};
