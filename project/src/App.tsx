
import './App.css';
import React from 'react';
import Timetable from './components/Timetable';
import { ModuleItem } from './components/ModuleItem';

function App() {
  localStorage.setItem('myKey', 'myValue');
  return (
    <div className="App">
      <Timetable />
    </div>
  );
}

export default App;
