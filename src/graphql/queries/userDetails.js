export const GET_USER = `
query GetUser($id: ID!) {
    user(id: $id) {
        id
        name
        username
        email
        website
        phone
        company {
            name
            catchPhrase
            bs
        }
        address {
            street
            suite
            city
            zipcode
        }
    }
}
`;
