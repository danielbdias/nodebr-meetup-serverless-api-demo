const localConfig = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY || 'my-consumer-key',
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'my-consumer-secret',
  accessToken: process.env.TWITTER_ACCESS_TOKEN || 'my-access-token',
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'my-access-token-secret'
}

const remoteConfig = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}

const api = {
  development: localConfig,
  test: localConfig,
  qa: remoteConfig,
  production: remoteConfig
}

module.exports = api[require('./environment')]
