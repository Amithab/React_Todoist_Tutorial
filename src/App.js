import React from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';

// export const is an inline export
// => function
export const App = () => ( // implicit vs explicit return
  <div className="App">
    <Header />
    <Content />
  </div>
);
