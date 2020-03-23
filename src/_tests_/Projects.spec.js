import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Projects } from '../components/Projects';

beforeEach(cleanup); // cleanup

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX')
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: 'THE OFFICE',
        projectId: '-M2pjk36------------',
        userId: 'YTCbNkMbAgfNL3xCBV2u',
        docId: 'EeK5YkgDdRDIKIYAaQWq',
      },
    ],
  })),
}));

describe('<Projects', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('renders the projects', () => {
      const { queryByTestId } = render(<Projects />);
      expect(queryByTestId('project-action')).toBeTruthy();
    });

    // Check active project
    it('renders the projects and selects an active project using onClick', () => {
      const { queryByTestId } = render(<Projects activeValue="1"/>);
      expect(queryByTestId('project-action')).toBeTruthy();

      fireEvent.click(queryByTestId('project-action'));
      expect(
        queryByTestId('project-action-parent').classList.contains('active')
      ).toBeTruthy();
    });

    // Check active project with key down
    it('renders the projects and selects an active project using onKeyDown', () => {
      const { queryByTestId } = render(<Projects activeValue="1"/>);
      expect(queryByTestId('project-action')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('project-action'));
      expect(
        queryByTestId('project-action-parent').classList.contains('active')
      ).toBeTruthy();
    });

    it('renders the projects with no active value', () => {
      const { queryByTestId } = render(<Projects activeValue="1"/>);
      expect(queryByTestId('project-action')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('project-action'));
      expect(
        queryByTestId('project-action-parent').classList.contains('sidebar__project')
      ).toBeTruthy();
    });
  });
});


