var Twit = require('twit');

require('dotenv').config();

/* Instancie o bot com as chaves no arquivo .env */
const Bot = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           01 * 1000,
});

console.log('Este bot está rodando...');

/* BotInit() : Para iniciar o bot */
function BotInit() {
	var query = {
		q: "#testebot",
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data) {
		if (error) {
			console.log('Bot não pôde achar o último tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);
			
			function BotRetweeted(error) {
				if (error) {
					console.log('Bot não pode retweetar, : ' + error);
				}
				else {
					console.log('Bot retweetou : ' + id.id);
				}
				
				setInterval(BotRetweeted, 30*60*1000);
			}
		}
	}
}


/* Inicialize o bot Bot */
BotInit();