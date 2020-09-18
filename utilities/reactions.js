function addReactions(client, alias) {
    function reactToMessage(client, channelId, messageId, emojiReaction, serverID) {
        client.guilds.cache.get(serverID).channels.cache.get(channelId).messages.fetch(messageId).then( e => 
            e.react(emojiReaction)
        )
    }

    //accept or deny rules message - add reacts
    reactToMessage(client, alias.channels.rules, alias.messages.rulesAccept, '\uD83D\uDFE9', alias.serverID)
    reactToMessage(client, alias.channels.rules, alias.messages.rulesAccept, '\uD83D\uDFE5', alias.serverID)
    
    //custom role 1 & 2 message - add reacts
    //if the optional settings roles and customrolesassign is off ('null') exit 
    if(alias.roles.custom == null || alias.messages.customRoles == null) return;
	for (const customRole in alias.roles.custom) {
        let finalCustomRole = alias.roles.custom[customRole]
		reactToMessage(client, alias.channels.roles, alias.messages.customRoles, finalCustomRole.emoji, alias.serverID)
	} 
}

function giveRoles(client, alias) {

    // Actual function for adding roles
    function addRole(message, reaction, user, roleid) {
        message.guild.members.fetch(user.id).then(member => {
            reaction.users.remove(user.id)
            member.roles.add(roleid);
        });
    }

    // Role adder function
    client.on('messageReactionAdd', (reaction, user) => {
        let message = reaction.message, emoji = reaction.emoji;
        if (user.id == client.user.id) return

        switch(message.id) {
        case alias.messages.rulesAccept:
            switch(emoji.name) {
            case '🟩':
                addRole(message, reaction, user, alias.roles.member)
                break;
            case '🟥':
                message.guild.members.fetch(user.id).then(member => {
                    reaction.users.remove(user.id)
                    member.kick();
                });
                break;
            default:
                break;
            }
            break;
        case alias.messages.customRoles:
			for (const customRole in alias.roles.custom) {
				if (emoji.name == alias.roles.custom[customRole].emoji) {
					addRole(message, reaction, user, alias.roles.custom[customRole].id)
				}
            }
            break;
        default:
            break;
        }	
    });
}


module.exports = {
    addReactions,
    giveRoles
}
