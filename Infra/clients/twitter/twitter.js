const dependencies = {
  config: require('../../config/twitter'),
  Twitter: require('twitter-node-client').Twitter
}

const parseSingleTweet = rawTweetData => {
  const text = rawTweetData.text
  const author = (rawTweetData.user && rawTweetData.user.screen_name) || 'unknown'
  const published = new Date(rawTweetData.created_at || new Date())

  return { text, author, published }
}

const parseTweets = data => {
  const dataAsObject = JSON.parse(data)

  return dataAsObject.statuses.map(parseSingleTweet)
}

const searchTweets = (queryString, maxTweets, injection) => {
  const { Twitter, config } = Object.assign({}, dependencies, injection)

  const client = new Twitter(config)

  return new Promise((resolve, reject) =>
    client.getSearch(
      { q: queryString, count: maxTweets },
      (err, response, body) => reject(handleTwitterApiError(err, response, body)),
      data => resolve(parseTweets(data))
    )
  )
}

const handleTwitterApiError = (err, response, body) => {
  console.log({ err })
  return new Error('Error calling Twitter API.')
}

const getTweetsByHashtag =
  (hashtag, maxTweets, injection) => searchTweets(`#${hashtag}`, maxTweets, injection)

const getTweetsByHandle =
  (handle, maxTweets, injection) => searchTweets(`#from:${handle}`, maxTweets, injection)

const postTweet = (message, injection) => {
  const { Twitter, config } = Object.assign({}, dependencies, injection)

  const client = new Twitter(config)

  return new Promise((resolve, reject) =>
    client.postTweet(
      { status: message },
      (err, response, body) => reject(handleTwitterApiError(err, response, body)),
      data => resolve(data.id)
    )
  )
}

module.exports = {
  getTweetsByHashtag,
  getTweetsByHandle,
  postTweet
}
