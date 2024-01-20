import React from "react";
import ClassForm from "../components/ClassForm";
import ClassList from "../components/ClassList";
import { Button } from "@mui/material";
import useLocalStorage from "../helpers/useLocalStorage";

interface ClassItem {
  id: string;
  moduleName: string;
  classType: string;
}

function Config() {
  const [classes, setClasses] = useLocalStorage<ClassItem[]>("classes", []); // Using the custom hook

  const handleAddClass = (newClass: {
    id: string;
    moduleName: string;
    classType: string;
  }) => {
    setClasses([...classes, newClass]);
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((classInfo) => classInfo.id !== id));
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <span className="text-2xl font-bold mb-4">Classes to Match</span>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <ClassForm onAddClass={handleAddClass} />
        </div>

        <ClassList classes={classes} onDelete={handleDeleteClass} />

        <div className="flex justify-end space-x-2">
          <Button
            variant="outlined"
            className="text-black border border-gray-300 hover:bg-gray-100"
          >
            Back
          </Button>
          <Button
            variant="contained"
            className="bg-orange-500 hover:bg-orange-700 text-white"
          >
            Match!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Config;
