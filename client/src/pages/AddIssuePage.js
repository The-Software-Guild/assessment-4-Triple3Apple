import { useState } from 'react';
import { Redirect } from "react-router";
import { useMutation } from '@apollo/client';
import { CREATE_ISSUE } from '../graphql/Mutations';

const AddIssuePage = ({ isLoggedIn }) => {

    const [addIssue, { data, loading, error }] = useMutation(CREATE_ISSUE);

    const [title, setTitle] = useState('');
    const [postDetails, setPostDetails] = useState('');

    if (isLoggedIn === false) {
        return <Redirect to="/" />
    }

    const handleAddIssue = (e) => {
        e.preventDefault();

        addIssue({
            variables: {
                title: title,
                body: postDetails
            },
        });


        resetUseStates();
    }

    const resetUseStates = () => {
        setTitle('');
        setPostDetails('');
    };

    return (

        <div className="add-issue-page">
            <form id="add-issue-form" onSubmit={(e) => handleAddIssue(e)}>
                <h1>Add a Issue</h1>
                <div className="form-container">
                    <input
                        type="text"
                        id="title-input"
                        value={title}
                        minLength="1"
                        placeholder="issue title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-container">
                    <input
                        type="text"
                        id="post-details-input"
                        value={postDetails}
                        minLength="1"
                        placeholder="issue info"
                        required
                        onChange={(e) => setPostDetails(e.target.value)}
                    />
                </div>
                <input className="submit-btn add-issue-btn" type="submit" value="Create Issue" />
            </form>
        </div>
    )
}

export default AddIssuePage
