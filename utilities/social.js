const Discord = require('discord.js')
const social = require('../commands/social')

// Create social embed function creates the embed in about-you channel and saves message id 
function createSocialEmbed(db, message) {

    const socialEmbed = new Discord.MessageEmbed()
        .setColor('#FFA500')
        .setTitle(`${message.author.username}'s socials`)
        .setThumbnail(message.author.displayAvatarURL())

    const socialProfiles = db.get(`users.${message.author.id}.socials`).value()

    for (var socialProfile in socialProfiles) {
        if (socialProfile == "messageId" || socialProfiles[socialProfile] == "") {
             
        } else {
            socialEmbed.addField(`${socialProfile}`, `${socialProfiles[socialProfile]}`, true)
        }
    }
    message.client.channels.cache.get("734348142111096893").send(socialEmbed).then( m => {
        db.get(`users.${message.author.id}.socials`)
            .set('messageId', m.id)
            .write()
    })


}

// Update social embed function edits the saved embed to add new usernames from db
function updateSocialEmbed(db, message) {
    const socialEmbed = new Discord.MessageEmbed()
        .setColor('#FFA500')
        .setTitle(`${message.author.username}'s socials`)
        .setThumbnail(message.author.displayAvatarURL())

    const socialProfiles = db.get(`users.${message.author.id}.socials`).value()
    const currentMessageId = db.get(`users.${message.author.id}.socials.messageId`).value()

    for (var socialProfile in socialProfiles) {
        if (socialProfile == "messageId" || socialProfiles[socialProfile] == "") {
            console.log('no field found') 
        } else {
            console.log(`field found for ${socialProfile}, ${socialProfiles[socialProfile]}`)
            socialEmbed.addField(`${socialProfile}`, `${socialProfiles[socialProfile]}`, true)
        }
    }
    message.client.channels.cache.get("734348142111096893").messages.fetch(currentMessageId).then( m => {
        console.log(currentMessageId)
        console.log(`found message ${m.id}`)
        m.edit(socialEmbed)
    })
}

// Create social profile function creates the database entry, as well as running createSocialEmbed
function createSocialProfile(db, message) {
    if (db.get(`users.${message.author.id}.socials.messageId`).value() !== undefined) {
        return "social profile already exists"
    }

    db.get(`users.${message.author.id}`)
        .set("socials", {"name": "", "snapchat": "", "instagram": "", "steam": "", "youtube": "", "twitch": "", "github": "", "messageId": ""})
        .write()
    
    createSocialEmbed(db, message)

    return "social profile created"
}


// Add social name function updates the database entries, as well as running updateSocialEmbed
function addSocialName(db, message, args) {
    if (db.get(`users.${message.author.id}.socials`) == undefined) {
        return "please create a social profile first"
    }

    const social = args[0].toLowerCase(); //QoL improvement
    
    if (social == "name" || social == "snapchat" || social == "instagram" || social == "steam" || social == "youtube" || social == "twitch" || social == "github" || social == "twitter" || social == "krunker" || social == "valorant") {
        db.get(`users.${message.author.id}.socials`)
            .set(`${args[0]}`, `${args[1]}`)
            .write()
        updateSocialEmbed(db, message)
        return `social profile for ${args[0]} created`
    } else {
        return `unrecognised social profile input`
    }
}

module.exports = {
    createSocialProfile,
    addSocialName
}
