import { gql } from '@apollo/client';

export const GET_USER_MODULES = gql`
    query GetUserModules {
        getUserModules {
            module_id
            module_name
            module_description
            front_end_url
            icon
            access
        }
    }
`;
