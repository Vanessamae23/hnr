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
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/timetable",
    element: <AppLayout component={<MyTimetable />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/friends/:id",
    element: <AppLayout component={<Friend />} />
  },
  {
    path: "friends",
    element: <AppLayout component={<AllFriends />} />,
  },
  {
    path: "config",
    element: <AppLayout component={<Config />} />,
  },
  {
    path: "matched/:id",
    element: <AppLayout component={<Matched />} />
  },
  {
    path: "matched",
    element: <AppLayout component={<AllMatched />} />,
  },
]);

function App() {
  localStorage.setItem('myKey', 'myValue');
  return (
    <RouterProvider router={router} />
  );
}

export default App;
