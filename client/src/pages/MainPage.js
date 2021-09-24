import { useEffect, useState } from 'react'
import { Redirect, Route } from "react-router";
import { useQuery, gql } from '@apollo/client';
import { LOAD_ISSUES } from '../graphql/Queries';
import IssueContainer from '../components/IssueContainer';

// Passed client via props for re-rendering.
const MainPage = ({ isLoggedIn, issuesData, client, userId }) => {

    const { error, loading, data } = useQuery(LOAD_ISSUES);

    if (isLoggedIn === false) {
        return <Redirect to="/" />
    }

    // rerender & refetch queries when component loaded
    useEffect(() => {
        console.log('On main page');

        refetchIssues(LOAD_ISSUES);
    }, []);


    if (isLoggedIn === false) {
        return <Redirect to="/" />
    }

    const refetchIssues = (query) => {
        client.refetchQueries({
            include: [query],
        });
    }

    if (data) {
        return (
            <div className="issues-page">
                <div className="issues-container">
                    {
                        data.issues.slice(0).reverse().map((issue) => {
                            return <IssueContainer
                                title={issue.title}
                                authorUsername={issue.author === null ? 'unknown' : issue.author.username}
                                body={issue.body}
                                id={issue.id}
                                upvotes={issue.upvotes}
                                downvotes={issue.downvotes}
                                usersVoted={issue.usersVoted}
                                comments={issue.comments}
                                issuesQuery={LOAD_ISSUES}
                                canDelete={false}
                                userId={userId}
                            ></IssueContainer>
                        })
                    }
                </div>

            </div>
        )
    } else {
        return (<h2>Loading..</h2>)

    }

}

export default MainPage
