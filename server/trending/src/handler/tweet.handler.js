const { TwitterClient, SentimentAnalyzer } = require("../services");

const twitterClient = new TwitterClient();
const sentimentAnalyzer = new SentimentAnalyzer();

const TweetHandler = {
  getAllTweets: async (req, res) => {
    try {
      const { hashtag } = req.query;

      return await twitterClient.getTweetsByHashtag(hashtag);
    } catch (err) {
      throw err;
    }
  },

  analyzeAllTweets: async (req, res) => {
    try {
      const { hashtag } = req.query;

      return { hashtag };
      // const tweets = twitterClient.getTweetsByHashtag(hashtag);
      // const results = sentimentAnalyzer.analyzeSentiments(tweets);

      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = TweetHandler;
