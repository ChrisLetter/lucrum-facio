import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../redux/reducers';
const initialState = {
  username: '',
  holdings: [],
};
let store = createStore(reducers, initialState);
import { MockedProvider } from '@apollo/react-testing';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={[]} addTypename={false}>
    <Provider store={store}>{children}</Provider>
  </MockedProvider>
);

describe('Landing Page', () => {
  it('It should display correctly the title', () => {
    render(<Home />, { wrapper: Wrapper });
    const title = screen.getByText('Lucrum Facio');
    expect(title).toBeInTheDocument();
  });
});
