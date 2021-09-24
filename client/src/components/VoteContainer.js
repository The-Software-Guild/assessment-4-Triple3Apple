import { useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_ISSUE } from '../graphql/Mutations';


const VoteContainer = ({ upvotes, downvotes, issueId, title, body, usersVoted, issuesQuery, userId }) => {

    const [updateIssue, { data, loading, error }] = useMutation(UPDATE_ISSUE);

    const handleVote = (isUpvote) => {
        if (userId) {
            console.log('inside handle vote, userId: ' + userId);
            console.log('issueId: ' + issueId);
            // check if user already voted on this post
            if (!usersVoted.includes(userId)) {

                // record that this user has voted
                let newUsersVoted = [...usersVoted];
                newUsersVoted.push(userId);

                if (isUpvote) {
                    upvoteIssue(newUsersVoted);
                }
                else {
                    downvoteIssue(newUsersVoted);
                }
            }
        } else {
            console.log('WARNING: no userId provided in VoteContainer');
        }

    }

    const upvoteIssue = (newUsersVoted) => {

        let newUpvotes = upvotes + 1;
        console.log('upvoting...');
        console.log('new upvote value: ' + newUpvotes);

        updateIssue({
            variables: {
                issueId: issueId,
                title: title,
                body: body,
                upvotes: newUpvotes,
                downvotes: downvotes,
                usersVoted: newUsersVoted
            },
            refetchQueries: [{ query: issuesQuery }]
        });
    }

    const downvoteIssue = (newUsersVoted) => {
        let newDownvotes = downvotes + 1;
        console.log('downvoting...');
        updateIssue({
            variables: {
                issueId: issueId,
                title: title,
                body: body,
                upvotes: upvotes,
                downvotes: newDownvotes,
                usersVoted: newUsersVoted
            },
            refetchQueries: [{ query: issuesQuery }]
        });
    }


    return (
        <div className="votes-container">
            <div className="upvotes-container">
                <button onClick={() => handleVote(true)}>👍</button>
                <h5 className="vote-count upvote">{upvotes}</h5>
            </div>
            <div className="downvotes-container">
                <button onClick={() => handleVote(false)}>👎</button>
                <h5 className="vote-count downvote">{downvotes}</h5>
            </div>
        </div>
    )
}

export default VoteContainer
