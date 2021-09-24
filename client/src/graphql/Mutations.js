import { gql, useMutation } from '@apollo/client';


export const CREATE_COMMENT = gql`
    mutation addComment($comment: String! $issueId: String!) {
        addComment(comment: $comment, issueId: $issueId) {
            id
            comment
        }
    }
`


export const CREATE_ISSUE = gql`
    mutation addIssue($title: String! $body: String!) {
        addIssue(title: $title, body: $body) {
            id
        }
    }
`


export const DELETE_ISSUE = gql`
    mutation deleteIssue($issueId: String!) {
        deleteIssue(issueId: $issueId) {
            id
            title
        }
    }
`
