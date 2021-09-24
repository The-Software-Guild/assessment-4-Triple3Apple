import React from 'react'
import { useMutation } from '@apollo/client';
import { DELETE_ISSUE } from '../graphql/Mutations';

const DeleteIssueButton = ({ issuesQuery, id }) => {

    const [deleteIssue, { data, loading, error }] = useMutation(DELETE_ISSUE);

    const handleDeleteIssue = () => {

        console.log('inside handleDeleteIssue');
        deleteIssue({
            variables: {
                issueId: id,
            },
            refetchQueries: [{ query: issuesQuery }]
        });

    }

    return (
        <div>
            <button onClick={() => handleDeleteIssue()}>🗑️</button>
        </div>
    )
}

export default DeleteIssueButton
