import React from "react";
import ClassItem from "./ClassItem";

interface ClassListProps {
  classes: Array<{
    id: string;
    moduleName: string;
    classType: string;
  }>;
  onDelete: (id: string) => void;
}

const ClassList: React.FC<ClassListProps> = ({ classes, onDelete }) => {
  return (
    <div>
      {classes.map((classInfo) => (
        <ClassItem
          key={classInfo.id}
          id={classInfo.id}
          moduleName={classInfo.moduleName}
          classType={classInfo.classType}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ClassList;
