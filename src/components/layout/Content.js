import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

// Adding className="content" centered tasks and sidebar
export const Content = () => (
  <section className="content">
    <Sidebar />
    <Tasks />
  </section>
);
