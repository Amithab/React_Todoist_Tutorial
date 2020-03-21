import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';

/*
 * render renders the component
 * cleanup cleans DOM from one test to the next
 * fireEvent simulates clicks on buttons and user interactions
 *
 */

beforeEach(cleanup); // clean the DOM!

// hits fake implementation of database
// all mocking, fake mock function for each firebase real function

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn()
        })),
      })),
    })),
  },
}));

describe('<Checkbox />', () => {
  describe('Success', () => {
    it('renders the task checkbox', () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="Finish this tutorial series!" />
      );
      // Does this exist?
      expect(queryByTestId('checkbox-action')).toBeTruthy();
    });

    it('renders the task checkbox and accepts a onClick', () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="Finish this tutorial series!" />
      );
      expect(queryByTestId('checkbox-action')).toBeTruthy();
      fireEvent.click(queryByTestId('checkbox-action')); // simulates click
      // add how many times has it been called?
    });

    it('renders the task checkbox and accepts a onKeyDown', () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="Finish this tutorial series!" />
      );
      expect(queryByTestId('checkbox-action')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('checkbox-action')); // simulates onKeyDown
      // console.log(fireEvent); // Print all functions available through fireEvent
    });
  });
});


/* Do failure case as well */
