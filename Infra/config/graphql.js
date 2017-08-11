const localConfig = {
  url: process.env.GRAPHQL_URL || 'http://graphql.com/url'
}

const remoteConfig = {
  url: process.env.GRAPHQL_URL
}

const api = {
  development: localConfig,
  test: localConfig,
  qa: remoteConfig,
  production: remoteConfig
}

module.exports = api[require('./environment')]
