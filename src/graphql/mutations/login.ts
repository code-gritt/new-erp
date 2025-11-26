import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation Login($userId: String!, $password: String!) {
        login(userId: $userId, password: $password) {
            token
            message
            user {
                userId
                username
                email
                companies {
                    company_id
                    company_name
                    divisions {
                        div_id
                        div_name
                    }
                }
            }
        }
    }
`;
