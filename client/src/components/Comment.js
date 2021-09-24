import React from 'react'

const Comment = ({ comment, username, commentId }) => {
    return (
        <div className="comment" key={commentId}>
            <p>{comment} ~ {username}</p>
        </div>
    )
}

export default Comment
