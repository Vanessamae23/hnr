import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import CustomButton from "./CustomButton";
import { AddFriendInput } from "../types/types";

const AddFriendForm: React.FC<{
  onAddFriend: (Friend: AddFriendInput) => void;
}> = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddFriend({ name, link });
    setName("");
    setLink("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 4 }}
    >
      <TextField
        label="Friend's Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <TextField
        label="NUSMods Link"
        variant="outlined"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <CustomButton onClick={undefined} label="Add Timetable" />
    </Box>
  );
};

export default AddFriendForm;
