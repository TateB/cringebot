const music = require('./../utilities/music.js')

module.exports = {
	name: 'music',
	description: 'music command for music!',
	execute(message, args, db, distube) {
		music.distubeCommandHandler(message, args, distube)
	}
};
