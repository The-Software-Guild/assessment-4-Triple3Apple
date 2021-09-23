import React from 'react'
import { Redirect, Route } from "react-router";

const MyIssuesPage = ({ isLoggedIn }) => {

    if (isLoggedIn === false) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h1>My issues here</h1>
        </div>
    )
}

export default MyIssuesPage
