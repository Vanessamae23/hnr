import React from 'react'
import FriendTimetable from '../components/FriendTimetable';
import useLocalStorage from '../helpers/useLocalStorage';
import { LOCALSTORAGE_KEY_FRIENDS } from '../constants/constants';
import { Class, Person } from '../types/types';
import { useParams, redirect } from 'react-router-dom';

function Friend() {
  const [friends, setFriends] = useLocalStorage<Person[]>(LOCALSTORAGE_KEY_FRIENDS, []);
  const idParam = useParams().id;

  if (idParam === undefined || idParam === "") {
    redirect("/friends");
  }
  const id = parseInt(idParam as string);
  if (id >= friends.length) {
    redirect("/friends");
  }

  const friend = friends[id];
  const setClasses = (classes: Class[]) => {
    const updatedFriends = [...friends];
    updatedFriends[id].classes = classes;
    setFriends(updatedFriends);
  }

  return (
    <FriendTimetable classes={friend.classes} setClasses={setClasses} />
  )
}

export default Friend