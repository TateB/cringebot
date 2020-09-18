const Discord = require('discord.js')

function marriageHandler(message,args,db,type) {
    // Set message author database reference and get relationships
    let messageAuthorDb = db.get("users").get(message.author).get("relationships")

    // If requested, clear proposal or show that there is none.
    if(args[0] == "propose" && args[1] == "remove") {
        if (messageAuthorDb.get("proposal.userId").value() == "") {
            message.channel.send(`${message.author}, there was no proposal to remove.`)
        } else {
            messageAuthorDb.set("proposal", {"userId": "", "messageId": ""}).write()
            message.channel.send(`${message.author}, your proposal has been removed.`)
        }
        return
    }

    // Look at mentioned user in database
    let otherUser = db.get("users").get(message.mentions.users.first().id).get("relationships")
    if (otherUser.value() == undefined) {
        console.log("setting partner relation status")
        db.get("users").get(message.mentions.users.first().id).set("relationships", { "proposal" : {"userId": "", "messageId": ""}, "partner": "", "children": [] }).write()
        console.log(db.get("users").get(message.mentions.users.first().id).get("relationships").value())
    }

    switch(type) {
        case "propose":
            if(messageAuthorDb.get("proposal.userId").value() == "" && otherUser.get("proposal.userId").value() == "") {
                console.log("relationchecked")
                messageAuthorDb.set("proposal.userId", {"userId": message.mentions.users.first().id, "messageId": message.id}).write()
                message.channel.send(`${message.mentions.users.first()}, ${message.author} has proposed to you!`)
            }
    }
}

function childHandler(message,args,db,type) {

}

function marriageDataFetch(message,args,db,type) {

}

function commandHandler(message, args, db) {
    if(db.get("users").get(message.author).get("relationships").value() == undefined) {
        console.log("defining user relationship statuses")
        db.get("users").get(message.author).set("relationships", { "proposal" : {"userId": "", "messageId": ""}, "partner": "", "children": [] }).write()
    }

    switch(args[0]) {
        case "propose":
            marriageHandler(message,args,db,"propose")
            break
        case "divorce":
            marriageHandler(message,args,db,"divorce")
            break
        case "adopt":
            childHandler(message,args,db,"adopt")
            break
        case "makeparent":
            childHandler(message,args,db,"makeparent")
            break
        case "emancipate":
            childHandler(message,args,db,"emancipate")
            break
        case "partner":
            marriageDataFetch(message,args,db,"partner")
            break
        case "parent":
            marriageDataFetch(message,args,db,"parent")
            break
        case "familysize":
            marriageDataFetch(message,args,db,"familysize")
            break
        default:
            if (message.mentions.users.size == 2) {
                marriageDataFetch(message,args,db,"relationship")
            }

            message.channel.send(`<@${message.author.id}>, that was an invalid relationship command.`)
            break
    }
}

module.exports = {
    commandHandler
}