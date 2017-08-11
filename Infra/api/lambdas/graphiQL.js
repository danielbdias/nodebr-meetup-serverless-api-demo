const { graphiqlLambda } = require('graphql-server-lambda')
const config = require('Infra/config/graphql')

module.exports = graphiqlLambda({ endpointURL: config.url })
