const { graphiqlLambda } = require('graphql-server-lambda')

module.exports = function graphiQLLambda (endpointURL) {
  return graphiqlLambda({ endpointURL })
}
