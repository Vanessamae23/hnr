import React from "react";
import ClassItem from "./ClassItem";
import { Group } from "../types/types";

interface ClassListProps {
  friendNames: string[];
  classes: Array<Group>;
  onDelete: (id: string) => void;
  handleEditFriends: (id: string, friends: string[]) => void;
}

const ClassList: React.FC<ClassListProps> = ({ friendNames, classes, onDelete, handleEditFriends }) => {
  return (
    <div>
      {classes.map((classInfo) => (
        <ClassItem
          key={classInfo.id}
          id={classInfo.id}
          moduleName={classInfo.moduleCode}
          classType={classInfo.lessonType}
          onDelete={onDelete}
          friendNames={friendNames}
          handleEditFriends={handleEditFriends}
          friends={classInfo.persons}
        />
      ))}
    </div>
  );
};

export default ClassList;
