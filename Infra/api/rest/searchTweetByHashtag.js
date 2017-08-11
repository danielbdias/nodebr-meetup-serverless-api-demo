const dependencies = {
  GetTweets: require('../../../Domain/UseCases/GetTweets')
}

module.exports = function searchTweetsByHashtag (event, context, callback, injection) {
  const { GetTweets } = Object.assign({}, dependencies, injection)

  const { hashtag } = event.queryStringParameters

  return GetTweets({ hashtag }, injection)
    .then(tweets => {
      return callback(null, { statusCode: 200, body: JSON.stringify(tweets) })
    })
    .catch(error => {
      return callback(error)
    })
}
