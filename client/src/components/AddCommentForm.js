import { useState } from 'react'

const AddCommentForm = ({ issueId, addComment }) => {

    const [comment, setComment] = useState('');

    const handleAddComment = () => {

        if (comment !== '') {
            addComment(comment, issueId);
            resetComment();
        }
    }

    const resetComment = () => {
        setComment('');
    }

    return (
        <div className="add-comment-form">
            <input className='add-comment-input' placeholder="Write a comment..." type="text" name="add-comment" value={comment} id="add-comment" onChange={(e) => {
                setComment(e.target.value)
            }} />
            <button className="add-comment-btn" onClick={() => handleAddComment()}>COMMENT</button>
        </div>
    )
}

export default AddCommentForm
