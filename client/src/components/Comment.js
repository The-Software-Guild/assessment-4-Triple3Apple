import React from 'react'

const Comment = ({ comment, username, commentId }) => {
    return (
        <div className="comment" key={commentId}>
            <p className="comment-username">{username}</p>
            <p className="comment-text">{comment}</p>
        </div>
    )
}

export default Comment
