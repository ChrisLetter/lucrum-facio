import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/authentication/Login';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../redux/reducers';
const initialState = {
  username: '',
  holdings: [],
};
let store = createStore(reducers, initialState);
import { MockedProvider } from '@apollo/react-testing';
import { LOGIN_USER } from '../graphql/apolloClient/mutations';

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        loginInput: {
          email: 'test@test.com',
          password: 'password',
        },
      },
    },
    newData: jest.fn(() => ({
      data: {
        login: {
          token: 'token',
          username: 'test',
        },
      },
    })),
  },
];

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <Provider store={store}>{children}</Provider>
  </MockedProvider>
);

describe('Login component', () => {
  it('it should render correctly the form and the button', () => {
    render(<Login />, { wrapper: Wrapper });
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('login mutation should be called when clicking the button', async () => {
    render(<Login />, { wrapper: Wrapper });
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'password');
    await waitFor(() => {
      userEvent.click(button);
    });
    const mutation = mocks[0].newData;
    await expect(mutation).toHaveBeenCalledTimes(1);
  });
});
