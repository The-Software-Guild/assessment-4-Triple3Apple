import React from 'react'

const VoteContainer = ({ upvotes, downvotes }) => {
    return (
        <div className="votes-container">
            <div className="upvotes-container">
                <button>👍</button>
                <h5 className="vote-count upvote">{upvotes}</h5>
            </div>
            <div className="downvotes-container">
                <button>👎</button>
                <h5 className="vote-count downvote">{downvotes}</h5>
            </div>
        </div>
    )
}

export default VoteContainer
