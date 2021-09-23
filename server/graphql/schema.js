const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// import the queries
// NOTE: remember to add it to the QueryType object ~ fields
const { users, user, issues, issue, issuesByUser, comments, comment, commentsByUser } = require('./queries');

// import the mutations
const { addIssue, addComment, updateIssue, deleteIssue, deleteComment } = require('./mutations')

// import the QueryType
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    // description added for documentation in 'Documentation Explorer' for GraphiQL
    // (right of the screen)
    description: 'Queries',
    fields: { users, user, issues, issue, issuesByUser, comments, comment, commentsByUser },
});

// import the MutationType
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: { addIssue, addComment, updateIssue, deleteIssue, deleteComment },
});



module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});
