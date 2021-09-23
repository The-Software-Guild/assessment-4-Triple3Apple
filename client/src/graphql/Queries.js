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