import { gql } from '@apollo/client';


export const LOAD_ISSUES = gql`
    query {
        issues {
            id
            title
            body
            upvotes
            downvotes
            usersVoted
            author {
                id
                username
            }
            comments {
                id
                comment
                user {
                    id
                    username
                }
            }
        }
    }
`

export const LOAD_MY_ISSUES = gql`
    query {
        issuesByUser {
            id
            title
            body
            upvotes
            downvotes
            usersVoted
            author {
                id
                username
            }
            comments {
                id
                comment
                user {
                    id
                    username
                }
            }
        }
    }
`