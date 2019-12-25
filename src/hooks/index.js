import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => { // when user selects project, it checks for tasks all the time
    let unsubscribe = firebase
    .firestore()
    .collection('tasks')
    .where('userId', '==', 'YTCbNkMbAgfNL3xCBV2u');

		unsubscribe =
			selectedProject && !collatedTasksExist(selectedProject)
				? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
				: selectedProject === 'TODAY'
				? (unsubscribe = unsubscribe.where(
						'date',
						'==',
						moment().format('DD/MM/YYYY')
					))
				: selectedProject === 'INBOX' || selectedProject === 0
				? (unsubscribe = unsubscribe.where('date', '==', ''))
				: unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
            task =>
              moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
              task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter(task => task.archived !== false)); // get all tasks where archived is true
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => { // checks with get() since it doesn't change often
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
			.firestore()
			.collection('projects')
			.where('userId', '==', 'YTCbNkMbAgfNL3xCBV2u')
			.orderBy('projectId')
			.get()
			.then(snapshot => {
				const allProjects = snapshot.docs.map(project => ({
					...project.data(),
					docId: project.id,
				}));
				// to prevent infinity loop since projects changing will call useProjects which changes projects
				if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
					setProjects(allProjects);
				}
			});
	}, [projects]);

	return { projects, setProjects };
};
