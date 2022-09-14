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
import reducers from '../redux/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { IUserInfo } from '../interfaces/interfaces';

const theme = extendTheme({
  fonts: {
    heading: 'Livvic',
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

// @ts-ignore
const persistedReducer = persistReducer<IUserInfo>(persistConfig, reducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

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
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
