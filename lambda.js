const { graphqlLambda, graphiqlLambda } = require('graphql-server-lambda')
const schema = require('./Infra/api/graphQL/schema')
const config = require('./Infra/config/graphql')

exports.graphql = graphqlLambda(
  function (event, context) {
    return { schema, context: { } }
  }
)

exports.graphiql = graphiqlLambda({ endpointURL: config.url })
