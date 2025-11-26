import { gql } from '@apollo/client';

export const SELECT_COMPANY_DIVISION = gql`
    mutation SelectCompanyDivision($userId: String!, $companyId: String!, $divId: String!) {
        selectCompanyDivision(userId: $userId, companyId: $companyId, divId: $divId) {
            token
            message
        }
    }
`;
