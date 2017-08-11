const dependencies = {
  TwitterClient: require('Infra/clients/twitter'),
  TweetRepository: require('Infra/repositories/TweetRepository'),
  DiscoverTweetSentiment: require('Domain/UseCases/DiscoverTweetSentiment')
}

const Tweet = require('Domain/Entities/Tweet')

const processSingleTweet = (rawTweet, injection) => {
  const { TweetRepository, DiscoverTweetSentiment } = Object.assign({}, dependencies, injection)

  const tweet = new Tweet(rawTweet)

  // classify
  tweet.sentiment = DiscoverTweetSentiment(tweet.text, injection)

  // save in database
  return TweetRepository.save(tweet)
}

const processTweets = (tweets, injection) => {
  return Promise.all(
    tweets.map(rawTweet => processSingleTweet(rawTweet, injection))
  )
}

const getTweets = (hashtag, tweetsToRetrieve, injection) => {
  const { TwitterClient } = Object.assign({}, dependencies, injection)

  return TwitterClient.getTweetsByHashtag(hashtag, tweetsToRetrieve, injection)
}

module.exports = function RetrieveTweets (hashtag, tweetsToRetrieve, injection) {
  return getTweets(hashtag, tweetsToRetrieve, injection)
          .then(tweets => processTweets(tweets, injection))
          .then(_ => true)
}
