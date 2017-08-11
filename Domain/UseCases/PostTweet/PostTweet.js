const dependencies = {
  TwitterClient: require('../../../Infra/clients/twitter')
}

module.exports = function PostTweet ({ message }, injection) {
  if (!message) return Promise.reject(new Error('You must define a message to post'))
  if (message.length > 140) return Promise.reject(new Error('Your message must less or equal than 140 characters'))

  const { TwitterClient } = Object.assign({}, dependencies, injection)

  return TwitterClient.postTweet(message, injection)
}
