import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../../components/authentication/Login';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../redux/reducers';
const initialState = {
  username: '',
  holdings: [],
};
let store = createStore(reducers, initialState);
import { MockedProvider } from '@apollo/react-testing';
import { LOGIN_USER } from './../../graphql/apolloClient/mutations';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={[]} addTypename={false}>
    <Provider store={store}>{children}</Provider>
  </MockedProvider>
);

describe('Login component', () => {
  it('it should render correctly the form', () => {
    render(<Login />, { wrapper: Wrapper });
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
