import React, { createContext, useContext } from 'react';
import { useProjects } from '../hooks';

// contexts allow one to pass information through the component tree without
// the use of props
// a provider and a consumer. provider at top level and consumer at lower level

export const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => {
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectsContext);

// const { projects }  = useProjectsValue(); // How to get value from provider
