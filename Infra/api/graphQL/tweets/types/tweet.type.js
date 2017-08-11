const { GraphQLString, GraphQLObjectType } = require('graphql')

const Tweet = new GraphQLObjectType({
  name: 'Tweet',
  description: 'Represent the relevant data of a single tweet used in this Domain.',
  fields: {
    text: {
      type: GraphQLString,
      description: 'Text of the tweet'
    },
    author: {
      type: GraphQLString,
      description: 'Name of the author name'
    },
    published: {
      type: GraphQLString,
      description: 'Date where the tweet was published'
    }
  }
})

module.exports = Tweet
