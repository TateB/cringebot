# bot:cringe
## the ultimate discord bot of cringe
main technology used: lowdb, distube (for bot music), discord.js

# Commands
## !ding
_allows for bot testing_

## !help
_bot help command, shows all available commands_

### !help [command]
shows help for a specific command

## !jeopardy
_jeopardy mini game, gives jeopardy category and question for you to answer_

### !jeopardy [answer]
displays if your answer is correct or incorrect

## !leaderboard
_shows leaderboard for the entire server_

## !level 
_shows level for user_

### !level [userMention]
shows level of the user mentioned

## !music
_allows music to be searched/queued for voice channel bot_

### !music play [name/link]
adds song to queue, or shows search results for song name

## !m
_(shortened) allows music to be searched/queued for voice channel bot_

### !m play [name/link]
adds song to queue, or shows search results for song name

## !prune
_allows messages to be pruned, requires manage messages permission_

### !prune [number]
prunes specified number of messages

## !social
_allows you to create a cue card in the #about-you channel that displays information and links to your socials_

### !social create
creates a blank card

`!social create`

### !social [medium] [link]
adds an element of type `medium` with information `link` to your social profile.

`!social twitter @my_twitter_handle`

Currently these types of social media are supported:
- name
- snapchat
- instagram
- steam
- youtube
- twitch
- github
- twitter
- krunker
- valorant

## !source
_shows source code for the bot_