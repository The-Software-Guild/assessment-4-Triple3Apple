import { useState } from 'react';
import { Redirect, Route } from "react-router";
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

        // create new issue
        // createNewIssue(title, postDetails);
        addIssue({
            variables: {
                title: title,
                body: postDetails
            },
            // refetchQueries: [{ query: issuesQuery }]
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
                <div className="form-container">
                    <h3>Issue Title: </h3>
                    <input
                        type="text"
                        id="title-input"
                        value={title}
                        minLength="1"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-container">
                    <h3>Post Details: </h3>
                    <input
                        type="text"
                        id="post-details-input"
                        value={postDetails}
                        minLength="1"
                        required
                        onChange={(e) => setPostDetails(e.target.value)}
                    />
                </div>
                <input type="submit" value="Create Issue" />
            </form>
        </div>
    )
}

export default AddIssuePage
