const { graphqlLambda } = require('graphql-server-lambda')
const { root } = require('Infra/api/graphQL/schema')

module.exports = graphqlLambda(
  (event, context) => ({ schema: root, context: { } })
)
