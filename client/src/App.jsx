import { Outlet } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import NavBar from './components/Navbar'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
  <>
  <div className='container'>
    <ApolloProvider client={client}>
    <ConfigProvider theme={{
      token: {
        colorPrimary: '6530AE',
        colorSuccess: '#a3d721',
        colorInfo: '#6530ae',
        colorWarning: '#de9e29',
        colorError: '#ff5c5e',
        colorLink: '#A6CBFC',
        colorBgBase: '#000000',
        sizeStep: 5,
        sizeUnit: 2,
        borderRadius: 2,
      },
      algorithm: theme.darkAlgorithm
    }}>
    <Outlet />
    </ConfigProvider>
    </ApolloProvider>
  </div>
  {window.location.pathname != '/' ? <NavBar /> : null}
  </>
  )
}

export default App
