import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddTask } from '../components/AddTask';

import { useSelectedProjectValue } from '../context'; // to mock
//import { firebase } from '../firebase';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase')),
      })),
    })),
  },
}));

describe('<AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear the 2 mocks after each it or test
  });

  describe('Success', () => {
    it('renders the <AddTask />', () => {
      const { queryByTestId } = render(<AddTask />);
      expect(queryByTestId('add-task-comp')).toBeTruthy();
    });

    it('renders the <AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn();

      const { queryByTestId } = render(
        <AddTask 
          showAddTaskMain
          shouldShowMain={false}
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );

      expect(queryByTestId('quick-add-task')).toBeTruthy();
    });

    // Show task
    it('renders the <AddTask /> main showable when clicked', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    // Show task with key down
    it('renders the <AddTask /> main showable using keyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    // Project Overlay
    it('renders the <AddTask /> project overlay when using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-project-overlay')); // Click the project overlay
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    // Project Overlay using key down
    it('renders the <AddTask /> project overlay when using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('show-project-overlay')); // Click the project overlay
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    // Task date overlay
    it('renders the <AddTask /> task date overlay when using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-task-date-overlay')); // Click the task date calendar
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

    // Task date overlay using key down
    it('renders the <AddTask /> task date overlay when using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('show-task-date-overlay')); // Click the task date calendar
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

    // Cancel task
    it('hides the <AddTask /> main when cancel is clicked using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-main-cancel')); // Click the cancel button
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    // Cancel task using key down
    it('hides the <AddTask /> main when cancel is clicked using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-task-main-cancel')); // Click the cancel button
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    // Cancel from Quick add task
    it('renders <AddTask /> for quick add task and then clicks cancel using onClick', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

      const { queryByTestId } = render(
        <AddTask 
          setShowQuickAddTask={setShowQuickAddTask}
          showQuickAddTask
        />
      );

      fireEvent.click(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-quick-cancel'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    // Cancel from Quick add task with key down
    it('renders <AddTask /> for quick add task and then clicks cancel using onKeyDown', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

      const { queryByTestId } = render(
        <AddTask 
          setShowQuickAddTask={setShowQuickAddTask}
          showQuickAddTask
        />
      );

      fireEvent.keyDown(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-task-quick-cancel'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });



    // Add a task to today which should remove main add task showable
    it('renders <AddTask /> and adds a task to TODAY', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'TODAY' // cleared for next test
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask 
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
      fireEvent.click(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-content')).toBeTruthy(); // expect input form to exist

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am a new task and I am amazing!'}
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am a new task and I am amazing!'
      );

      fireEvent.click(queryByTestId('add-task'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    // Add a task to next 7 which should remove main add task showable
    it('renders <AddTask /> and adds a task to NEXT_7', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'NEXT_7' // cleared for next test
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask 
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
      fireEvent.click(queryByTestId('show-main-action')); // Show the main add task
      expect(queryByTestId('add-task-content')).toBeTruthy(); // expect input form to exist

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am a new task and I am amazing!'}
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am a new task and I am amazing!'
      );

      fireEvent.click(queryByTestId('add-task'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    // Add task with task date overlay choosing today
    it('renders <AddTask /> and adds a task with a task date of TODAY', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }));

      const { queryByTestId } = render(<AddTask showMain />);
      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy(); // input form
      expect(queryByTestId('add-task-main')).toBeTruthy();


      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am the most amazing task ever!'}
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am the most amazing task ever!'
      );

      fireEvent.click(queryByTestId('show-task-date-overlay')); // Click the task date calendar
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('task-date-today'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy(); // Overlay should go away

      fireEvent.click(queryByTestId('show-task-date-overlay')); // Click the task date calendar
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('task-date-today'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy(); // Overlay should go away

      fireEvent.click(queryByTestId('add-task'));
    });

    // Add task with task date overlay choosing tomorrow
    it('renders <AddTask /> and adds a task with a task date of TOMORROW', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }));

      const { queryByTestId } = render(<AddTask showMain />);
      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy(); // input form
      expect(queryByTestId('add-task-main')).toBeTruthy();


      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am the most amazing task ever!'}
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am the most amazing task ever!'
      );

      fireEvent.click(queryByTestId('show-task-date-overlay')); // Click the task date calendar
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('task-date-tomorrow'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy(); // Overlay should go away

      fireEvent.click(queryByTestId('show-task-date-overlay')); // Click the task date calendar
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('task-date-tomorrow'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy(); // Overlay should go away

      fireEvent.click(queryByTestId('add-task'));
    });

    // Add task with task date overlay choosing next 7
    it('renders <AddTask /> and adds a task with a task date of NEXT_7', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }));

      const { queryByTestId } = render(<AddTask showMain />);
      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy(); // input form
      expect(queryByTestId('add-task-main')).toBeTruthy();


      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am the most amazing task ever!'}
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am the most amazing task ever!'
      );

      fireEvent.click(queryByTestId('show-task-date-overlay')); // Click the task date calendar
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('task-date-next-week'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy(); // Overlay should go away

      fireEvent.click(queryByTestId('show-task-date-overlay')); // Click the task date calendar
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('task-date-next-week'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy(); // Overlay should go away

      fireEvent.click(queryByTestId('add-task'));
    });



  });
});

