const tweets = require('./tweets.query')
const postTweet = require('./postTweet.mutation')

module.exports = {
  queries: { tweets },
  mutations: { postTweet }
}
