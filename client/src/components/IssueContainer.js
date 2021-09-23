import React from 'react'
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';
// import { CREATE_COMMENT } from '../graphql/Mutations'
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

export const CREATE_COMMENT = gql`
    mutation addComment($comment: String! $issueId: String!) {
        addComment(comment: $comment, issueId: $issueId) {
            id
            comment
        }
    }
`

const IssueContainer = ({ title, authorUsername, body, id, upvotes, downvotes, usersVoted, comments, refetchQuery }) => {

    //const [addComment, { error }] = useMutation(CREATE_COMMENT);
    const [addComment, { data, loading, error }] = useMutation(CREATE_COMMENT);

    const createComment = (comment, issueId) => {
        console.log(comment);
        console.log(issueId);

        addComment({
            variables: {
                comment: comment,
                issueId: issueId
            },
            refetchQueries: [{ query: refetchQuery }]
        });
    }

    return (
        <div className="issue-container">
            <h3 className="issue-title">{title}</h3>
            <h5 className="issue-author">By: {authorUsername}</h5>
            <h5 className="issue-body">{body}</h5>
            <div className="votes-container">
                <div className="upvotes-container">
                    <button>⬆️</button>
                    <h5 className="vote-count upvote">{upvotes}</h5>
                </div>
                <div className="downvotes-container">
                    <button>⬇️</button>
                    <h5 className="vote-count downvote">{downvotes}</h5>
                </div>
            </div>
            <AddCommentForm issueId={id} addComment={createComment}></AddCommentForm>
            {comments.map((comment) => {
                return <Comment comment={comment.comment} username={comment.user === null ? 'Unknown' : comment.user.username} commentId={comment.id}></Comment>
            })}
        </div>
    )
}

export default IssueContainer
