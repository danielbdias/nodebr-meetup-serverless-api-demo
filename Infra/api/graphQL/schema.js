const { GraphQLObjectType, GraphQLSchema } = require('graphql')

const fs = require('fs')
const path = require('path')

const getSchemaDefinitions = () => {
  const currentDir = __dirname

  const definitionsPackages = fs.readdirSync(currentDir)
    .filter(file => fs.lstatSync(path.join(currentDir, file)).isDirectory())
    .map(dirName => `./${dirName}`)

  return definitionsPackages.map(packagePath => require(packagePath))
}

const schemaDefinitions = getSchemaDefinitions()

const queries = Object.assign({}, ...schemaDefinitions.map(definition => definition.queries))
const mutations = Object.assign({}, ...schemaDefinitions.map(definition => definition.mutations))

const schemaObject = {}

if (queries && Object.keys(queries).length > 0) {
  schemaObject.query = new GraphQLObjectType({
    name: 'Query',
    description: 'Set of queries used to retrieve Twitter data',
    fields: () => (queries)
  })
}

if (mutations && Object.keys(mutations).length > 0) {
  schemaObject.mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Set of operations that will change Twitter data',
    fields: () => (mutations)
  })
}

module.exports = new GraphQLSchema(schemaObject)
