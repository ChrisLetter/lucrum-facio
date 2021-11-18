import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/livvic';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const PORT = process.env.PORT || 3000;

const theme = extendTheme({
  fonts: {
    heading: 'Livvic',
  },
});

const client = new ApolloClient({
  uri: `http://localhost:${PORT}/api/graphql`,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
