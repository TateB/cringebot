const marriage = require('../utilities/marriage.js')

module.exports = {
	name: 'relation',
	description: 'relation command for relationships',
	usage: '!relation [relationship] [user]',
	execute(message, args, db) {
		marriage.commandHandler(message, args, db)
	}
};
