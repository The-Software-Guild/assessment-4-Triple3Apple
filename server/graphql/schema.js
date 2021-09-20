const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// import the queries
const { } = require('./queries');

// import the mutations
const { } = require('./mutation')

// import the QueryType
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: {},
})

// import the MutationType
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: {},
})



module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
