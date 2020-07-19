module.exports = {
	name: 'ding',
	description: 'Ding!',
	execute(message, args) {
		message.channel.send('Dong.');
	},
};
