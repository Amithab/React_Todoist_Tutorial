import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';

// export const is an inline export
// => function
// implicit vs explicit return
// explicit return when we want to add some state eg useState
export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <SelectedProjectProvider> {/* now the context and providers can be*/}
      <ProjectsProvider>      {/* accessed by Header and Content all the way down*/}
        <main
          data-testid="application"
          className={darkMode ? 'darkmode' : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content /> {/* If need to change from anywhere, use contexts*/}
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};
