
import './App.css';
import React from 'react';
import Timetable from './components/Timetable';
import { ModuleItem } from './components/ModuleItem';
import Header from './components/Header';

function App() {
  localStorage.setItem('myKey', 'myValue');
  return (
    <div className="App">
      <Header />
      <Timetable />
    </div>
  );
}

export default App;
