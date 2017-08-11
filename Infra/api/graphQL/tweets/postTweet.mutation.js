const { GraphQLString, GraphQLInt } = require('graphql')

const dependencies = {
  postTweet: require('../../../../Domain/UseCases/PostTweet')
}

module.exports = {
  type: GraphQLInt,
  description: 'Post a message on Twitter using the app user',
  args: {
    message: {
      type: GraphQLString,
      name: 'Message to tweet'
    }
  },
  resolve: (_, { message }, context, injection) => {
    const { postTweet } = Object.assign({}, dependencies, injection)

    return postTweet({ message }, injection)
  }
}
