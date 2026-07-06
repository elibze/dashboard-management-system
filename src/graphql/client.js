const GRAPHQL_URL = "https://graphqlzero.almansi.me/api";

export async function fetchGraphQL(query, variables = {}) {
    const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return json.data;
}