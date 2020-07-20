function addReactions(client) {
    function reactToMessage(client, channelId, messageId, emojiReaction) {
        client.guilds.cache.get('734343453051453460').channels.cache.get(channelId).messages.fetch(messageId).then( e => 
            e.react(emojiReaction)
        )
    }

    reactToMessage(client, "734346523969585202", "734362546466979881", '\uD83D\uDFE9')
	reactToMessage(client, "734346523969585202", "734362546466979881", '\uD83D\uDFE5')
	reactToMessage(client, "734346592873742426", "734365412409737317", '1️⃣')
	reactToMessage(client, "734346592873742426", "734365412409737317", '2️⃣')

}

function giveRoles(client) {

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
            case "734362546466979881":
                switch(emoji.name) {
                    case '🟩':
                        addRole(message, reaction, user, "734356952011767810")
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
            case "734365412409737317":
                switch(emoji.name) {
                    case '1️⃣':
                        addRole(message, reaction, user, "734366871092068363")
                        break;
                    case '2️⃣':
                        addRole(message, reaction, user, "734366905317457920")
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