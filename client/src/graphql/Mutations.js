import { gql, useMutation } from '@apollo/client';


export const CREATE_COMMENT = gql`
    mutation addComment($comment: String $issueId: String) {
        addComment(comment: $comment, issueId: $issueId) {
            id
            comment
        }
    }
`

export const CREATE_ISSUE = gql`
    mutation addIssue($comment: String $body: String) {
        addIssue(comment: $comment, body: $body) {
            id
        }
    }
`
