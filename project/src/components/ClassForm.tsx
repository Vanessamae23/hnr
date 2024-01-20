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

const ClassForm: React.FC<{
  onAddClass: (newClass: {
    id: string;
    moduleName: string;
    classType: string;
  }) => void;
}> = ({ onAddClass }) => {
  const [moduleCode, setModuleCode] = useState("");
  const [classType, setClassType] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Date.now().toString();
    onAddClass({ id, moduleName: moduleCode, classType });
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
      <FormControl sx={{ flexGrow: 1, width: 200 }} variant="outlined">
        <InputLabel>Select Class Type</InputLabel>
        <Select
          value={classType}
          onChange={(e) => setClassType(e.target.value as string)}
          label="Select Class Type"
        >
          <MenuItem value="Lecture">Lecture</MenuItem>
          <MenuItem value="Tutorial">Tutorial</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add Class
      </Button>
    </Box>
  );
};

export default ClassForm;
