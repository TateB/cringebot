
const {prefix, token, alias} = require("../config.json");

module.exports = {
    name: "pronoun",
    description: "sets your pronouns as a role",
    usage: "!pronoun",
    execute(message, args, db){
		let pronounObject = alias.roles.pronouns; //for readability
		
		if(args.length == 0) { //makes sure no empty arguments
			message.reply("usage: `"+prefix+"pronoun x/y` where x and y are your subjective and objective pronouns respectivley. If youre not sure, try `"+prefix+"pronoun help`");
			return;
		}

		if(args[0] == "help"){
			message.reply("This command allows you to set your pronouns as your role in the server, you can do this with the command `"+prefix+"pronoun xx/yy` where xx and yy are your respective subjective and objective pronouns. Please note that these are hardcoded and these are the ones currently available, you can use them in any combination:\n **subjective pronouns:** \n- he\n- she\n- they\n- any\n **objective pronouns**\n- him\n- her\n- them\n- all");
			return;
		}
		
		let re = /.+\/.+/;	
		if(!re.test(args[0])) { //checks to make sure input is in the format xx/yy
			message.reply("usage: `"+prefix+"pronoun x/y` where x and y are your subjective and objective pronouns respectivley, If youre not sure, try `"+prefix+"pronoun help`");
			return;
		}
		
		var pronouns = args[0].split("/"); //splits the pronouns into subjective and objective
		//eg: it may look like: [he, him]
		
		// Set pronouns, if one is undefined, throw error.
		var pronounsToAdd = [pronounObject[pronouns[0]], pronounObject[pronouns[1]]]

		if (pronounsToAdd[0] == undefined || pronounsToAdd[1] == undefined) {
			message.reply("Sorry, we don't have those pronouns hardcoded. If you think it should be, you can submit an issue at https://github.com/TateB/cringebot/issues/new")
		} else {
			message.member.roles.remove(Object.values(pronounObject)).then(m => {
				message.member.roles.add(pronounsToAdd)
			})
			message.reply("Done!")
		}

    }
}
