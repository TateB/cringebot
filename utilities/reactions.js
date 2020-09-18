function addReactions(client, alias) {
    function reactToMessage(client, channelId, messageId, emojiReaction, serverID) {
        client.guilds.cache.get(serverID).channels.cache.get(channelId).messages.fetch(messageId).then( e => 
            e.react(emojiReaction)
        )
    }

    //accept or deny rules message - add reacts
    reactToMessage(client, alias.rules, alias.rulesAcceptMessage, '\uD83D\uDFE9', alias.serverID)
    reactToMessage(client, alias.rules, alias.rulesAcceptMessage, '\uD83D\uDFE5', alias.serverID)
    
    //custom role 1 & 2 message - add reacts
    //if the optional settings roles and customrolesassign is off ('null') exit 
    if(alias.roles == null || alias.customRolesAssignMessage == null) return; 
    reactToMessage(client, alias.roles, alias.customRolesAssignMessage, '1️⃣', alias.serverID)
    reactToMessage(client, alias.roles, alias.customRolesAssignMessage, '2️⃣', alias.serverID)

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
        case alias.rulesAcceptMessage:
            switch(emoji.name) {
            case '🟩':
                addRole(message, reaction, user, alias.defaultMemberRole)
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
        case alias.customRolesAssignMessage:	    
            switch(emoji.name) {
            case '1️⃣':
		if(alias.customRuleOne == null) break;
                addRole(message, reaction, user, alias.customRuleOne)
                break;
            case '2️⃣':
		if(alias.customRuleTwo == null) break;
                addRole(message, reaction, user, alias.customRuleTwo)
                break;
            default:
                break;
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
