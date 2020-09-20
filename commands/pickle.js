var crypto = require('crypto');


module.exports = {
    name: "pickle",
    description: "tells you your penis size",
    usage: "!pickle",
    execute(message, args){
	if(message.author.id == "179447175812612096"){
	    	message.channel.send("Holy shit <@179447175812612096>, I don't have a large enough ruler for you");
	} else if (message.author.id == "132399256525864961") {
		message.channel.send("Wow! <@132399256525864961>, You're off the charts big!")
	} else {
	    var shasum;
	    var hash;
	    shasum = crypto.createHash('sha1');
	    shasum.update(message.author.id);
	    hash = shasum.digest('hex');
	    message.channel.send("Woah <@" + message.author.id + ">, your dick is " + (parseInt(hash, 16)%30) + "cm long. Nice cock!");   
	}	   
    }
}
