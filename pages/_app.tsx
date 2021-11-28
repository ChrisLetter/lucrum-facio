import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/livvic';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const PORT = process.env.PORT || 3000;
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './../redux/reducers';

const theme = extendTheme({
  fonts: {
    heading: 'Livvic',
  },
});

let store = createStore(reducers);

const httpLink = createHttpLink({
  uri: `http://localhost:${PORT}/api/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
