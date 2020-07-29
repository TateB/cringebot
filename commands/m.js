const music = require('../utilities/music.js')

module.exports = {
	name: 'm',
	description: 'music comnmand for music playing in voice channels (shortened)',
	usage: '!m play [name/link]',
	execute(message, args, db, distube) {
		music.distubeCommandHandler(message, args, distube)
	}
};
