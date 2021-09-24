import React from 'react'
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';
import DeleteIssueButton from './DeleteIssueButton';
import VoteContainer from './VoteContainer';
// import { CREATE_COMMENT } from '../graphql/Mutations'
// import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../graphql/Mutations';

// const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql');



const IssueContainer = ({ title, authorUsername, body, id, upvotes, downvotes, usersVoted, comments, issuesQuery, myIssuesQuery, canDelete }) => {

    //const [addComment, { error }] = useMutation(CREATE_COMMENT);
    const [addComment, { data, loading, error }] = useMutation(CREATE_COMMENT);
    // const [deleteIssue, { data: deleteData, loading, error }] = useMutation(DELETE_COMMENT);

    const createComment = (comment, issueId) => {
        console.log(comment);
        console.log(issueId);

        if (issuesQuery) {
            addComment({
                variables: {
                    comment: comment,
                    issueId: issueId
                },
                refetchQueries: [{ query: issuesQuery }]
            });
        }

    }



    // TODO: Implement delete functionality
    return (
        <div className="issue-container">
            <div className="title-container">
                <h3 className="issue-title">{title}</h3>
                {canDelete === true && <DeleteIssueButton issuesQuery={myIssuesQuery} id={id} />}
            </div>

            <h5 className="issue-author">By: {authorUsername}</h5>
            <h5 className="issue-body">{body}</h5>
            <VoteContainer upvotes={upvotes} downvotes={downvotes} />
            {/* <div className="votes-container">
                <div className="upvotes-container">
                    <button>👍</button>
                    <h5 className="vote-count upvote">{upvotes}</h5>
                </div>
                <div className="downvotes-container">
                    <button>👎</button>
                    <h5 className="vote-count downvote">{downvotes}</h5>
                </div>
            </div> */}
            <AddCommentForm issueId={id} addComment={createComment}></AddCommentForm>
            <div className="comments">
                {comments.slice(0).reverse().map((comment, i) => {
                    return (
                        <div key={i}>
                            <Comment comment={comment.comment} username={comment.user === null ? 'Unknown' : comment.user.username} commentId={comment.id}></Comment>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default IssueContainer
