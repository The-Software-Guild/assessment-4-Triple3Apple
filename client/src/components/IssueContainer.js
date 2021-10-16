import React from 'react'
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';
import DeleteIssueButton from './DeleteIssueButton';
import VoteContainer from './VoteContainer';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../graphql/Mutations';

import getPostPicName from '../utils/postPics';
import pic1 from '../assets/img/post_pics/post_pic_chain.png';
import pic2 from '../assets/img/post_pics/post_pic_fire.png';
import pic3 from '../assets/img/post_pics/post_pic_litter.png';
import pic4 from '../assets/img/post_pics/post_pic_pollution.png';
import pic5 from '../assets/img/post_pics/post_pic_trash1.png';
import pic6 from '../assets/img/post_pics/post_pic_trash2.png';
import pic7 from '../assets/img/post_pics/post_pic_warning.png';


const imageArray = [pic1, pic2, pic3, pic4, pic5, pic6, pic7];


const IssueContainer = ({ title, authorUsername, body, id, upvotes, downvotes, usersVoted, comments, issuesQuery, myIssuesQuery, userId, canDelete, postNumber }) => {

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

    /**
 * Gets the picture file name using post number
 * @param {Number} postNum Number representing post number
 * @returns picture file name
 */
    const getPostPicName = (postNum) => {

        while (postNum >= imageArray.length) {
            postNum = postNum - imageArray.length;
        }

        if (postNum < 0) {
            console.warn(`Received negative post number: ${postNum}`)
            return imageArray[0];
        }

        return imageArray[postNum];
    }

    return (
        <div className="issue-container">
            <img className="post-pic" src={getPostPicName(postNumber)} alt="post pic" />
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

            <h5 className="issue-body">{body}</h5>
            <h5 className="issue-author">Report by {authorUsername}</h5>
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
            <AddCommentForm issueId={id} addComment={createComment}></AddCommentForm>

        </div>
    )
}

export default IssueContainer
