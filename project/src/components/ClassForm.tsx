import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Autocomplete,
} from "@mui/material";
import { Group } from "../types/types";
import CustomButton from "./CustomButton";
import { getAllModuleCodes, getLessonTypes } from "../utils/data";

const ClassForm: React.FC<{
  onAddClass: (newClass: Group) => void;
}> = ({ onAddClass }) => {
  const [moduleCode, setModuleCode] = useState("");
  const [lessonType, setLessonType] = useState("");

  const handleSelectModuleCode = (e: any, newValue: string | null) => {
    setModuleCode(newValue ? newValue : "");
    setLessonType("");
  }

  const moduleCodes = getAllModuleCodes();
  const lessonTyepOptions = moduleCode === "" ? [] : getLessonTypes(moduleCode);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Date.now().toString();
    onAddClass({ id, moduleCode: moduleCode, lessonType: lessonType, persons: []});
    setModuleCode("");
    setLessonType("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 4 }}
    >
      <Autocomplete options={moduleCodes} renderInput={(params) => <TextField {...params} label="Module Code" />} sx={{ width: 200}} value={moduleCode} onChange={handleSelectModuleCode}/>
      <FormControl sx={{ flexGrow: 1 }} variant="outlined">
        <InputLabel>Select Class Type</InputLabel>
        <Select
          value={lessonType}
          onChange={(e) => setLessonType(e.target.value as string)}
          label="Select Class Type"
          style={{ width: "200px" }} // Add this line to set a fixed width
          disabled={moduleCode === ""}
        >
          {lessonTyepOptions.map((lessonType) => {
            return <MenuItem value={lessonType}>{lessonType}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <CustomButton label="Add Class" onClick={undefined} disabled={moduleCode == "" || lessonType == ""}/>
    </Box>
  );
};

export default ClassForm;
