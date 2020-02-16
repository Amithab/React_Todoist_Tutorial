import React from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';

// export const is an inline export
// => function
export const App = () => ( // implicit vs explicit return
  <SelectedProjectProvider> // now the context and providers can be
    <ProjectsProvider>      // accessed by Header and Content all the way down
      <div className="App">
        <Header />
        <Content />
      </div>
    </ProjectsProvider>
  </SelectedProjectProvider>
);
