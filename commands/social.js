const social = require('./../utilities/social.js')

module.exports = {
	name: 'social',
	description: 'social profile commands',
	execute(message, args, db) {
        switch(args[0]) {
            case "create":
                message.channel.send(social.createSocialProfile(db, message))
                break;
            default:
                message.channel.send(social.addSocialName(db, message, args))
                break;
        }
	},
}
