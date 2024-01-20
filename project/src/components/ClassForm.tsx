import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { Group } from "../types/types";
import CustomButton from "./CustomButton";

const ClassForm: React.FC<{
  onAddClass: (newClass: Group) => void;
}> = ({ onAddClass }) => {
  const [moduleCode, setModuleCode] = useState("");
  const [classType, setClassType] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Date.now().toString();
    onAddClass({ id, moduleCode: moduleCode, lessonType: classType, persons: []});
    setModuleCode("");
    setClassType("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 4 }}
    >
      <TextField
        label="Enter Module Code"
        variant="outlined"
        value={moduleCode}
        onChange={(e) => setModuleCode(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <FormControl sx={{ flexGrow: 1 }} variant="outlined">
        <InputLabel>Select Class Type</InputLabel>
        <Select
          value={classType}
          onChange={(e) => setClassType(e.target.value as string)}
          label="Select Class Type"
          style={{ width: "200px" }} // Add this line to set a fixed width
        >
          <MenuItem value="Lecture">Lecture</MenuItem>
          <MenuItem value="Tutorial">Tutorial</MenuItem>
        </Select>
      </FormControl>
      <CustomButton label="Add Class" onClick={undefined} />
    </Box>
  );
};

export default ClassForm;
