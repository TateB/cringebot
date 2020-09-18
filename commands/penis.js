var crypto = require('crypto');


module.exports = {
    name: "penis",
    description: "tells you your penis size",
    usage: "!penis",
    execute(message, args){
	if(message.author.id == "179447175812612096"){
	    message.channel.send("Holy shit <@179447175812612096>, I don't have a long enough ruler for you");
	}else {
	    var shasum = crypto.createHash('sha1');
	    shasum.update(message.author.id);
	    var hash = shasum.digest('hex');
	    message.channel.send("Woah <@" + message.author.id + ">, your dick is " + (parseInt(hash)%30) + "cm long. Nice cock!");   
	}	   
    }
}
