import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup); // clean me

describe('<App />', () => {
  it('renders the application', () => { // creates false positives, so keep testing
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeFalsy();
  });

  it('renders the application using dark mode', () => {
    const { queryByTestId } = render(<App darkModeDefault />);
    expect(queryByTestId('application')).toBeTruthy();
    // Not something that user sees but testing class
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy();
  });
});
