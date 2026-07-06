export const GET_DASHBOARD_STATS = `
query {
    users {
        data { id }
    }
    posts {
        data { id }
    }
    comments {
        data { id }
    }
    albums {
        data { id }
    }
}
`;