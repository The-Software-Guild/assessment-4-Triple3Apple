const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// import the queries
const { users } = require('./queries');

// import the mutations
const { register, login } = require('./mutation')

// import the QueryType
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: { users },
})

// import the MutationType
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: { register, login },
})



module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
