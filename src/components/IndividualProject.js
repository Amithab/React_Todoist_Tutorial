import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase } from '../firebase';

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false); // when deleting, show confirmation to user
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]); // set current projects - refresh
        setSelectedProject('INBOX');
      });
  };
  // <> fragment so it can render two components next to each other from parent standpoint
  return (
    <> 
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span 
        className="sidebar__project-delete" 
        data-testid="delete-project" 
        onClick={() => setShowConfirm(!showConfirm)} // don't want to fire off immediately so use ()
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
                <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
              </button>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
