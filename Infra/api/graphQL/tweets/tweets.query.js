const { GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const TweetType = require('./types/tweet.type')

const dependencies = {
  GetTweets: require('../../../../Domain/UseCases/GetTweets')
}

module.exports = {
  type: new GraphQLList(TweetType),
  description: 'Retrieve a list of messages of a certain hashtag or user.',
  args: {
    handle: {
      type: GraphQLString,
      name: 'User handle in Twitter'
    },
    hashtag: {
      type: GraphQLString,
      name: 'Hashtag to search'
    },
    tweetsToRetrieve: {
      type: GraphQLInt,
      name: 'Max number of tweets to retrieve'
    }
  },
  resolve: (_, { handle, hashtag, tweetsToRetrieve }, context, injection) => {
    const { GetTweets } = Object.assign({}, dependencies, injection)

    return GetTweets({ handle, hashtag, tweetsToRetrieve }, injection)
  }
}
