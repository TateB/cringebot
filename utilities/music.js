
const Discord = require('discord.js');


function createMusicInterface(db, client, alias) {
    let musicDb = db.get('music')
    var amountQueued = 0
    var firstPageQueued = 0
    if (musicDb.get('queue').isEmpty().value()) {
        amountQueued = 0
        firstPageQueued = 0
    } else {
        amountQueued = musicDb.get('queue').size().value()
        firstPageQueued = musicDb.get('queue').take(5).size().value()
    }
    
    
    const musicEmbed = new Discord.MessageEmbed()
        .setTitle("music")
        .setColor("#FFA500")
        .setDescription("currently disconnected")

    const queueEmbed = new Discord.MessageEmbed()
        .setTitle("queue")
        .setColor("#FFA500")
        queueEmbed.setDescription('no songs currently in queue')
        queueEmbed.setFooter(`showing 0/0`)

    client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).send(musicEmbed).then(m => {
        musicDb.get('currentMessageIds')
            .set('musicUi', m.id)
            .write()
    })
    client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).send(queueEmbed).then(m => {
        musicDb.get('currentMessageIds')
            .set('queueUi', m.id)
            .write()
    })
}

function updateNowPlaying(db, client, distube, song, queue, alias) {
    let musicIds = db.get('music.currentMessageIds').value()
    var upnextSong
    if(queue.songs.length > 1) {
        upnextSong = queue.songs[1].name
    } else {
        upnextSong = "none"
    }

    const musicEmbed = new Discord.MessageEmbed()
        .setTitle("music")
        .setColor("#FFA500")
        .setDescription("**now playing**")
        .setURL(`${queue.songs[0].url}`)
        .addField("title", `${queue.songs[0].name}`, true)
        .addField("duration", `${queue.songs[0].formattedDuration}`, true)
        .setThumbnail(`${queue.songs[0].thumbnail}`)
        .addField("up next", `${upnextSong}`)

    client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).messages.fetch(musicIds.musicUi).then( m => {
        m.edit(musicEmbed)
        m.reactions.removeAll()
        .then(() => m.react('⏸️'))
        .then(() => m.react('⏩'))
        .then(() => m.react('🛑'))
        .then(() => m.react('🔀'))
        .then(() => m.react('🔂'))
        .then(() => m.react('🔁'))
        .then(() => m.react('⛔'))
    })
}

function updateQueue(db, client, queue, alias) {
    let musicIds = db.get('music.currentMessageIds').value()
    let currentPage = db.get('music.currentPage').value()
    let totalPages = Math.ceil(queue.songs.length / 5)
    if (currentPage > totalSongs) {
        db.set("music.currentPage", totalSongs).write()
    }

    const queueEmbed = new Discord.MessageEmbed()
    .setTitle("queue")
    .setColor("#FFA500")

    if (queue.songs.length == 0) {
        queueEmbed.setDescription('no songs currently in queue')
        queueEmbed.setFooter(`showing 0/0`)
    } else {
        var desc = ""
        var totalSongs = []
        queue.songs.forEach(s => {
            totalSongs.push(s)
        })
        let songsInPage = totalSongs.splice((5*currentPage)-5, 5)

        songsInPage.forEach(song => {
            let actualIndex = queue.songs.indexOf(song) + 1

            desc += `**${actualIndex}**: [${song.name}](${song.url}) - ${song.formattedDuration} (<@${song.user.id}>)\n`
        })
        

        if (currentPage == 1 && totalSongs == 1) {
            client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).messages.fetch(musicIds.queueUi).then(m => {
                m.reactions.removeAll()
            })
        } else if (queue.songs.length > currentPage*5) {
            if (currentPage == 1) {
                client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).messages.fetch(musicIds.queueUi).then(m => {
                    m.reactions.removeAll()
                    .then(() => m.react('⬇️'))
                })
            } else if (totalPages > currentPage) {
                client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).messages.fetch(musicIds.queueUi).then(m => {
                    m.reactions.removeAll()
                    .then(() => m.react('⬆️'))
                    .then(() => m.react('⬇️'))
                })
            } else {
                client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).messages.fetch(musicIds.queueUi).then(m => {
                    m.reactions.removeAll()
                    .then(() => m.react('⬆️'))
                })
            }
        } else {
            client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).messages.fetch(musicIds.queueUi).then(m => {
                m.reactions.removeAll()
                .then(() => m.react('⬆️'))
            })
        }

        queueEmbed.setDescription(desc)
        queueEmbed.setFooter(`showing ${currentPage}/${totalPages}`)

        client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).messages.fetch(musicIds.queueUi).then(m => {
            m.edit(queueEmbed)
        })
    }

    


}

function clearMusicChannel(client, alias) {
    client.guilds.cache.get(alias.serverID).channels.cache.get(alias.channels.music).bulkDelete(5, true).catch( err => {
        console.log(`there was an error trying to clear the music channel`)
    })
}

function initialiseMusicInterface(db, client, alias) {
    clearMusicChannel(client, alias);
    createMusicInterface(db, client, alias);
}

function distubeReactionListener(db, client, distube) {

    client.on('messageReactionAdd', (reaction, user) => {
        let message = reaction.message, emoji = reaction.emoji
        let musicIds = db.get('music.currentMessageIds').value()

        if (user.id == client.user.id) return
        if (message.id != musicIds.musicUi && message.id != musicIds.queueUi) return

        switch(message.id) {
            case musicIds.musicUi:
                switch(emoji.name){
                    case '⏸️':
                        distube.pause(reaction.message)
                        reaction.message.reactions.removeAll()
                        .then(() => reaction.message.react('▶️'))
                        .then(() => reaction.message.react('⏩'))
                        .then(() => reaction.message.react('🛑'))
                        .then(() => reaction.message.react('🔀'))
                        .then(() => reaction.message.react('🔂'))
                        .then(() => reaction.message.react('🔁'))
                        .then(() => reaction.message.react('⛔'))
                        break
                    case '▶️':
                        distube.resume(reaction.message)
                        reaction.message.reactions.removeAll()
                        .then(() => reaction.message.react('⏸️'))
                        .then(() => reaction.message.react('⏩'))
                        .then(() => reaction.message.react('🛑'))
                        .then(() => reaction.message.react('🔀'))
                        .then(() => reaction.message.react('🔂'))
                        .then(() => reaction.message.react('🔁'))
                        .then(() => reaction.message.react('⛔'))
                        break
                    case '⏩':
                        distube.skip(reaction.message)
                        break
                    case '🔀':
                        distube.shuffle(reaction.message)
                        break
                    case '🔂':
                        distube.setRepeatMode(reaction.message, 1)
                        break
                    case '🔁':
                        distube.setRepeatMode(reaction.message, 2)
                        break
                    case '⛔':
                        distube.setRepeatMode(reaction.message, 0)
                        break
                    case '🛑':
                        distube.stop(reaction.message)
                        reaction.message.reactions.removeAll()
                        const newMusicEmbed = new Discord.MessageEmbed()
                        .setTitle("music")
                        .setColor("#FFA500")
                        .setDescription("currently disconnected")
                        break
                    default:
                        break
                }
                break
            case musicIds.queueUi:
                switch(emoji.name) {
                    case '⬆️':
                        db.update('music.currentPage', n => n - 1).write()
                        updateQueue(db, client, distube.getQueue(reaction.message))
                        break
                    case '⬇️':
                        updateQueue(db, client, distube.getQueue(reaction.message))
                        db.update('music.currentPage', n => n + 1).write()
                        break
                }
                break
            default:
                break
        }
        reaction.users.remove(user.id)
    })
}

function distubeCommandHandler(message, args, distube) {
    const command = args.shift()

    switch(command) {
        case "play":
            distube.play(message, args.join(" "));
            break;
        default:
            message.channel.send("invalid music command")
            break;
    }
        
}

function distubeEventHandler(db, distube, client, alias) {
    distube
    .on("playSong", (message, queue, song) => {
        updateNowPlaying(db, client, distube, song, queue, alias)
        updateQueue(db, client, queue, alias)
    })
    .on("addSong", (message, queue, song) => {
        message.channel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        updateNowPlaying(db, client, distube, song, queue, alias)
        updateQueue(db, client, queue, alias)
    })
    .on("playList", (message, queue, playlist, song) => {
        updateNowPlaying(db, client, distube, song, queue, alias)
        updateQueue(db, client, queue, alias)
        message.channel.send(`Play ${playlist.title} playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing ${song.name} - ${song.formattedDuration}`)
    })
    .on("addList", (message, queue, playlist) => {
        updateQueue(db, client, queue, alias)
        message.channel.send(`Added ${playlist.title} playlist (${playlist.total_items} songs) to queue`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.title} - \`${song.duration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, err) => message.channel.send(
        "An error encountered: " + err
    ));

}

module.exports = {
    initialiseMusicInterface,
    distubeCommandHandler,
    distubeEventHandler,
    distubeReactionListener
}
