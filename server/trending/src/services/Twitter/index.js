const Twit = require("twit");

class TwitterClient {
  constructor() {
    this.T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000,
    });
  }

  getTweetsByHashtag(hashtag, count = 10) {
    return new Promise((resolve, reject) => {
      const params = {
        q: hashtag,
        count: count,
      };

      this.T.get("search/tweets", params, (err, data, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.statuses.map((tweet) => tweet.text));
        }
      });
    });
  }
}

module.exports = { TwitterClient };
