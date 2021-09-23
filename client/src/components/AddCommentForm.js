import { useState } from 'react'

const AddCommentForm = ({ issueId, addComment }) => {

    const [comment, setComment] = useState('');

    const handleAddComment = () => {

        if (comment !== '') {
            console.log('attempting to add comment from add comment form')

            addComment(comment, issueId);

            resetComment();
        }
    }

    const resetComment = () => {
        setComment('');
    }

    return (
        <div className="add-comment-form">
            <input className='add-comment-input' type="text" name="add-comment" value={comment} id="add-comment" onChange={(e) => {
                setComment(e.target.value)
            }} />
            <button onClick={() => handleAddComment()}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm
