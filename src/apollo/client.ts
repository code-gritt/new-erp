import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: createHttpLink({
        uri: 'http://192.168.2.109:4001/graphql',
    }),
    cache: new InMemoryCache(),
});

export default client;
