import { useEffect } from 'react'
import { Redirect, Route } from "react-router";
import { useQuery } from '@apollo/client';
import { LOAD_MY_ISSUES } from '../graphql/Queries';
import IssueContainer from '../components/IssueContainer';

const MyIssuesPage = ({ isLoggedIn, client }) => {

    const { error, loading, data } = useQuery(LOAD_MY_ISSUES);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    })

    useEffect(() => {
        console.log('on my issues page');

        refetchMyIssues(LOAD_MY_ISSUES);

    }, []);

    useEffect(() => {
        console.log('on my issues page');

        refetchMyIssues(LOAD_MY_ISSUES);

    }, [data]);

    if (isLoggedIn === false) {
        return <Redirect to="/" />
    }

    const refetchMyIssues = (query) => {
        client.refetchQueries({
            include: [query],
        });
    }



    if (data) {
        return (
            <div className="issues-page">
                {
                    data.issuesByUser.slice(0).reverse().map((issue) => {
                        return <IssueContainer
                            title={issue.title}
                            authorUsername={issue.author === null ? 'unknown' : issue.author.username}
                            body={issue.body}
                            id={issue.id}
                            upvotes={issue.upvotes}
                            downvotes={issue.downvotes}
                            usersVoted={issue.usersVoted}
                            comments={issue.comments}
                            // issuesQuery={LOAD_MY_ISSUES}
                            myIssuesQuery={LOAD_MY_ISSUES}
                            canDelete={true}
                        // issuesQuery={issuesQuery}
                        ></IssueContainer>
                    })
                }
            </div>
        )
    } else {
        return (
            <div>Loading</div>
        )
    }
}

export default MyIssuesPage