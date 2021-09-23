import { useEffect, useState } from 'react'
import { Redirect, Route } from "react-router";
import { useQuery, gql } from '@apollo/client';
import { LOAD_ISSUES } from '../graphql/Queries';
import IssueContainer from '../components/IssueContainer';

const MainPage = ({ isLoggedIn }) => {

    const { error, loading, data } = useQuery(LOAD_ISSUES);

    const { issues, setIssues } = useState([]);

    useEffect(() => {
        if (data) {
            console.log(data.issues);
            //setIssues(data.issues);
        }

    }, [data]);

    if (isLoggedIn === false) {
        return <Redirect to="/" />
    }

    if (data) {
        return (
            <div className="issues-page">
                {
                    data.issues.map((issue) => {
                        return <IssueContainer
                            title={issue.title}
                            authorUsername={issue.author === null ? 'unknown' : issue.author.username}
                            body={issue.body}
                            id={issue.id}
                            upvotes={issue.upvotes}
                            downvotes={issue.downvotes}
                            usersVoted={issue.usersVoted}
                            comments={issue.comments}
                            refetchQuery={LOAD_ISSUES}
                        ></IssueContainer>
                    })
                }

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
