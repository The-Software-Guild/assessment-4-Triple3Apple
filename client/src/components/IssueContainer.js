import React from 'react'
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';
import DeleteIssueButton from './DeleteIssueButton';
import VoteContainer from './VoteContainer';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../graphql/Mutations';


const IssueContainer = ({ title, authorUsername, body, id, upvotes, downvotes, usersVoted, comments, issuesQuery, myIssuesQuery, userId, canDelete }) => {

    const [addComment, { data, loading, error }] = useMutation(CREATE_COMMENT);

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

    return (
        <div className="issue-container">
            <div className="title-container">
                <div className="issue-title-container">
                    <h3 className="issue-title">{title}</h3>
                    {
                        canDelete === true &&
                        <DeleteIssueButton
                            issuesQuery={myIssuesQuery}
                            id={id}
                        />
                    }
                </div>
            </div>

            <h5 className="issue-author">By: {authorUsername}</h5>
            <h5 className="issue-body">{body}</h5>
            {canDelete === true ? <VoteContainer
                issueId={id}
                upvotes={upvotes}
                downvotes={downvotes}
                title={title}
                body={body}
                usersVoted={usersVoted}
                userId={userId}
                issuesQuery={issuesQuery} />
                :
                <VoteContainer
                    issueId={id}
                    upvotes={upvotes}
                    downvotes={downvotes}
                    title={title}
                    body={body}
                    usersVoted={usersVoted}
                    userId={userId}
                    issuesQuery={myIssuesQuery} />}
            <AddCommentForm issueId={id} addComment={createComment}></AddCommentForm>
            <div className="comments">
                {comments.length > 0 && <h3>Comments</h3>}

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
