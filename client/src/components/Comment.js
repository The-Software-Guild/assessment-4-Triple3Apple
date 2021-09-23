import React from 'react'

const Comment = ({ comment, username, commentId }) => {
    return (
        <div className="comment">
            <p>{comment} ~ {username}</p>
        </div>
    )
}

export default Comment
