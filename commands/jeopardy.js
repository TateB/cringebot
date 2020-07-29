const https = require('https');

module.exports = {
	name: 'jeopardy',
	description: 'gives you jeopardy question/answers',
	usage: '!jeopardy <answer>',
	execute(message, args, db) {

        if (!args.length) {
            https.get('https://jservice.io/api/random', (resp) => {
                let data = '';
              
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                  data += chunk;
                });
              
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    let finalResponse = JSON.parse(data)
                    let question = finalResponse[0].question
                    let category = finalResponse[0].category.title
                    let answer = finalResponse[0].answer

                    db.get('trivia').set('lastQuestionAnswer', answer).write()
                    message.channel.send(`**category:** ${category}\n**question:** ${question}`)
                });
              
            }).on("error", (err) => {
            console.log("Error: " + err.message);
            });
        } else {
            let answer = db.get('trivia.lastQuestionAnswer').value()
            if(answer.toLowerCase() == args.join(" ")) {
                message.channel.send('Correct!')
            } else {
                message.channel.send(`Incorrect. The answer was **${answer}**`)
            }
        }
	},
};
