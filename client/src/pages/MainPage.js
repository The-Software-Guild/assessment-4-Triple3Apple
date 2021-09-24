import { useEffect, useState } from 'react'
import { Redirect, Route } from "react-router";
import { useQuery, gql } from '@apollo/client';
import { LOAD_ISSUES } from '../graphql/Queries';
import IssueContainer from '../components/IssueContainer';

// Passed client via props for re-rendering.
const MainPage = ({ isLoggedIn, issuesData, client, userId }) => {

    const { error, loading, data } = useQuery(LOAD_ISSUES);

    const { issues, setIssues } = useState([]);

    if (isLoggedIn === false) {
        return <Redirect to="/" />
    }

    useEffect(() => {
        if (data && issues) {
            console.log(data.issues);
            // setIssues(data.issues);

        }

    }, [data]);

    // rerender & refetch queries when component loaded
    useEffect(() => {
        console.log('on main page');

        refetchIssues(LOAD_ISSUES);
        // client.refetchQueries({
        //     include: [LOAD_ISSUES],
        // });

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
                            // issuesQuery={issuesQuery}
                            ></IssueContainer>
                        })
                    }
                </div>

            </div>
        )
    } else {
        <h2>Loading..</h2>
    }

    return (
        <div className="issues-page">
            <h3>This is the main page showing all the issues</h3>
            {/* {(data.issues) &&
                data.issues.map((issue) => {
                    return <IssueContainer title={issue.title}></IssueContainer>
                })
            } */}
        </div>
    )
}

export default MainPage
