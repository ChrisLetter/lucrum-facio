import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/livvic';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
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

const client = new ApolloClient({
  uri: `http://localhost:${PORT}/api/graphql`,
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
