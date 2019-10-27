import React from 'react';
import { Header } from './components/layout/Header';

// export const is an inline export
// => function
export const App = () => ( // implicit vs explicit return
  <div className="App">
    <Header />
  </div>
);
