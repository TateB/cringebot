# bot:cringe
 the ultimate discord bot of cringe written with lowdb and discord.js

## Running the bot
_this bot runs on nodeJS and as such node and npm must all be installed and up to date to proceeed. Git is also required_

**1)** Start by cloning this repository onto your computer with `git clone https://github.com/TateB/cringebot/`

**2)** Navigate to the downloaded folder with `cd cringebot`

**3)** Next, install all relevant dependencies with `npm install`

**4)** Then create your Discord server. Make sure it has a dedicated channel for the following:

- Bot commands
- level ups
- music 
- rules
- roles (optional)

Also make sure that the #rules (and #roles) channel have at least one message in it. (this could be the list of server rules for example)

Make sure your server has a baseline role all members will have, should they agree to the rules.

**5)** Finally, create  a file called `config.json` in the same directory as the bot.
This file will contain all the relevant server and connection details, it should look something like this:
```javascript
{
	"prefix": "!",
	"token": "tokenHere",
	"alias": {
		"serverID": "",
		"channels": {
			"botCommands": "",
			"levelUps": "",
			"music": "",
			"rules": "",
			"roles": ""
		},
		"messages": {
			"rulesAccept": "",
			"customRoles": ""
		},
		"roles": {
			"member": "",
			"custom": {
				"customOne": {
					"id": "",
					"emoji": ""
				}, 
				"customTwo": {
					"id": "",
					"emoji": ""
				}
			}
		}
	}
}
```
You will have to populate the values of each field yourself.
- `serverID` = the id of your discord server, you can get this by right clicking the server icon and clicking 
"Copy ID"
- `botCommand` - roles = These correspond to the ID of the listed text channels. You can also get these by right clicking the channel name and clicking "Copy ID". _Note that you do not need individual channels for each, you can put them all in the same channel if you wish. However #music needs to be a separate, standalone channel._
- `rulesAcceptMessage` and `customRolesAssignMessage` = These are the messages that the bot will then attach reacts to. The messages have to be in the rules and roles channel respectively.
- `defaultMemberRole` = this is the default role that all members of the server will receive upon accepting the rules (by reacting to `rulesAcceptMessage`)
- `customRoleOne/Two` = these are the role ids you can specify for members to receive by reacting to `customRolesAssignMessage`, you can use one, both or neither.

**Tip: if you do not want to use one of the optional values, just put the word `null` as the value, as demonstrated above**

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

#### !social create
creates a blank card

`!social create`

#### !social [medium] [link]
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

## Credits
Written by:
- [Tate B](https://github.com/TateB) 
- [Sam B](https://github.com/SamBkamp)

## !source
_shows source code for the bot_
