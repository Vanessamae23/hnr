import './App.css';
import React from 'react';
import Home from './pages/Home';
import Config from './pages/Config';
import AllFriends from './pages/AllFriends';
import Friend from './pages/Friend';
import Matched from './pages/Matched';
import AllMatched from './pages/AllMatched';
import MyTimetable from './pages/MyTimetable';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from './pages/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/timetable",
    element: <MyTimetable />,
  },
  {
    path: "/friends/:id",
    element: <Friend />
  },
  {
    path: "friends",
    element: <AllFriends />,
  },
  {
    path: "config",
    element: <Config />,
  },
  {
    path: "matched/:id",
    element: <Matched />
  },
  {
    path: "matched",
    element: <AllMatched />,
  },
]);

function App() {
  localStorage.setItem('myKey', 'myValue');
  return (
    <RouterProvider router={router} />
  );
}

export default App;
