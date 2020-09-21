
const {prefix, token, alias} = require("../config.json");

module.exports = {
    name: "pronoun",
    description: "sets your pronouns as a role",
    usage: "!pronouns",
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
	
	if(pronouns[0] == "he" || pronouns[0] == "she" || pronouns[0] == "they" || pronouns[0] == "any" || pronouns[1] == "him" || pronouns[1] == "her" || pronouns[1] == "them" || pronouns[1] == "all"){
	    message.member.roles.remove(Object.values(pronounObject)); //clears all pronouns
	    
	    message.member.roles.add(alias.roles.pronouns[pronouns[0]]); //adds selected ones
	    message.member.roles.add(alias.roles.pronouns[pronouns[1]]);
	    
	    message.reply("Done!");
	}else {
	    message.reply("Sorry, we don't have those pronouns hardcoded. If you think it should be, you can submit an issue at https://github.com/TateB/cringebot/issues/new");
	}
	
    }
}
