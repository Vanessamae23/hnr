import React from 'react'
import { classesToPrograms } from '../utils/data';
import { linkToClasses } from '../utils/utils';
import { useApp } from '../useApp';
import FriendTimetable from '../components/FriendTimetable';

function Friend({link}) {
  
  const { isLoading, getEpgProps, getLayoutProps, toggleLock } = useApp(classesToPrograms(linkToClasses(link)));
  return (
    <div>
    </div>
  )
}

export default Friend