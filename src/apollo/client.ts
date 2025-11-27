import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: createHttpLink({
        uri: import.meta.env.DEV ? '/graphql' : `${import.meta.env.VITE_API_URL}/graphql`,
    }),
    cache: new InMemoryCache(),
});

export default client;
