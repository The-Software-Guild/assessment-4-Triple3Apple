import { useEffect, useState } from 'react'
import { Redirect, Route } from "react-router";
import { useQuery, gql } from '@apollo/client';
import { LOAD_ISSUES } from '../graphql/Queries';
import IssueContainer from '../components/IssueContainer';

// import SimpleBar from 'simplebar-react';
// import 'simplebar/dist/simplebar.min.css';


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

    /*
    return (
        <SimpleBar className="scroll-container">
            {({ scrollableNodeRef, contentNodeRef }) => (
                <div ref={scrollableNodeRef}>
                    <div ref={contentNodeRef}>
                        {[...Array(200)].map((x, i) => (
                            <p key={i}>Some content</p>
                        ))}
                    </div>
                </div>
            )}
        </SimpleBar>

    )
    */

    if (data) {
        let postIndex = 0;
        return (
            /* issues-page div used to be wrapping below */
            <>
                <div className="issues-container">
                    {
                        data.issues[0] ?
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
                                    postNumber={postIndex++}
                                ></IssueContainer>
                            })
                            : <h2 className="issues-status">No Climate Issues</h2>
                    }
                </div>


                {/* <div className="issues-container">
                    <h2>TEST</h2>
                    {
                        data.issues[0] ?
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
                            : <h2 className="issues-status">No Climate Issues</h2>
                    }

                </div> */}
            </>
        )
    } else {
        return (<h2>Loading..</h2>)
    }

    if (data) {
        return (
            /* issues-page div used to be wrapping below */
            <>
                <SimpleBar className="issues-container">
                    {({ scrollableNodeRef, contentNodeRef }) => (
                        <div ref={scrollableNodeRef}>
                            <div ref={contentNodeRef}>
                                {
                                    data.issues[0] ?
                                        data.issues.slice(0).reverse().map((issue) => {
                                            return (
                                                <div>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                    <h1> TEST</h1>
                                                </div>

                                            )
                                            {/* return <IssueContainer
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
                                            ></IssueContainer> */}
                                        })
                                        : <h2 className="issues-status">No Climate Issues</h2>
                                }
                            </div>
                        </div>
                    )}
                </SimpleBar>
                {/* <div className="issues-container">
                    <h2>TEST</h2>
                    {
                        data.issues[0] ?
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
                            : <h2 className="issues-status">No Climate Issues</h2>
                    }

                </div> */}
            </>
        )
    } else {
        return (<h2>Loading..</h2>)

    }


    // if (data) {
    //     return (
    //         <div className="issues-page">
    //             <div className="issues-container">
    //                 <h2>TEST</h2>
    //                 {
    //                     data.issues[0] ?
    //                         data.issues.slice(0).reverse().map((issue) => {
    //                             return <IssueContainer
    //                                 title={issue.title}
    //                                 authorUsername={issue.author === null ? 'unknown' : issue.author.username}
    //                                 body={issue.body}
    //                                 id={issue.id}
    //                                 upvotes={issue.upvotes}
    //                                 downvotes={issue.downvotes}
    //                                 usersVoted={issue.usersVoted}
    //                                 comments={issue.comments}
    //                                 issuesQuery={LOAD_ISSUES}
    //                                 canDelete={false}
    //                                 userId={userId}
    //                             ></IssueContainer>
    //                         })
    //                         : <h2 className="issues-status">No Climate Issues</h2>
    //                 }

    //             </div>
    //         </div>
    //     )
    // } else {
    //     return (<h2>Loading..</h2>)

    // }

}

export default MainPage
