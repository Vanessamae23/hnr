// ClassForm.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const ClassForm: React.FC<{
  onAddClass: (newClass: {
    id: string;
    moduleName: string;
    classType: string;
  }) => void;
}> = ({ onAddClass }) => {
  const [moduleCode, setModuleCode] = useState("");
  const [classType, setClassType] = useState(""); // Presuming you have a state for class type as well

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Generate a unique ID for the new class - could be more sophisticated in a real app
    const id = Date.now().toString();
    onAddClass({ id, moduleName: moduleCode, classType });
    setModuleCode(""); // Reset the module code field
    setClassType(""); // Reset the class type field
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <div className="flex">
        <TextField
          label="Enter Module Code"
          variant="outlined"
          value={moduleCode}
          onChange={(e) => setModuleCode(e.target.value)}
          className="mr-2"
        />
        <FormControl variant="outlined" className="flex-1">
          <InputLabel>Select Class Type</InputLabel>
          <Select
            value={classType}
            onChange={(e) => setClassType(e.target.value as string)}
            label="Select Class Type"
          >
            <MenuItem value="Lecture">Lecture</MenuItem>
            <MenuItem value="Tutorial">Tutorial</MenuItem>
            {/* Add other class types as needed */}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="ml-2"
        >
          Add Class
        </Button>
      </div>
    </form>
  );
};

export default ClassForm;
