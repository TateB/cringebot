function createSocialProfile(db, message) {
    db.get(`users.${message.author.id}`)
    .set("socials", {"name": "", "snapchat": "", "instagram": "", "steam": "", "youtube": "", "twitch": "", "github": "", "messageId": message.id})
}

module.exports = {
    createSocialProfile
}