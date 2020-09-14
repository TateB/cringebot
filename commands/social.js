const social = require('./../utilities/social.js')

module.exports = {
	name: 'social',
    description: 'social profile commands',
    usage: '!social create\n!social [medium] [link/@]\navailable mediums: name, snapchat, instagram, steam, youtube, twitch, github, twitter, krunker, valorant',
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
