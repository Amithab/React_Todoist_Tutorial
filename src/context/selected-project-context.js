import React, { createContext, useContext, useState } from 'react';

// contexts allow one to pass information through the component tree without
// the use of props
// a provider and a consumer. provider at top level and consumer at lower level

export const SelectedProjectContext = createContext();
export const SelectedProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState('INBOX'); // default

  return (
    <SelectedProjectContext.Provider 
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
