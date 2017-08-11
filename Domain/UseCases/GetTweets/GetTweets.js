const dependencies = {
  TwitterClient: require('Infra/clients/twitter')
}

const Tweet = require('Domain/Entities/Tweet')

const processTweets = (tweets, injection) => {
  return Promise.all(
    tweets.map(rawTweet => new Tweet(rawTweet))
  )
}

const getTweets = ({ hashtag, handle, tweetsToRetrieve }, injection) => {
  const { TwitterClient } = Object.assign({}, dependencies, injection)

  if (hashtag) {
    return TwitterClient.getTweetsByHashtag(hashtag, tweetsToRetrieve, injection)
  }

  return TwitterClient.getTweetsByHandle(handle, tweetsToRetrieve, injection)
}

module.exports = function GetTweets ({ hashtag, handle, tweetsToRetrieve }, injection) {
  if (!hashtag && !handle) return Promise.reject(new Error('You must define a #hashtag or a @handle'))
  if (hashtag && handle) return Promise.reject(new Error('You must define a #hashtag or a @handle, not both at same time'))

  return getTweets({ hashtag, handle, tweetsToRetrieve }, injection)
          .then(tweets => processTweets(tweets, injection))
}
