export const GET_USERS = `
query GetUsers {
    users {
        data {
            id
            name
            username
            email
            website
            company {
                name
            }
        }
    }
}
`;