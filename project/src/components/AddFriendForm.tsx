import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import CustomButton from "./CustomButton";

const AddFriendForm: React.FC<{
  onAddFriend: (Friend: { name: string; nusModsLink: string }) => void;
}> = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [nusModsLink, setNusModsLink] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddFriend({ name, nusModsLink });
    setName("");
    setNusModsLink("");
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
        value={nusModsLink}
        onChange={(e) => setNusModsLink(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <CustomButton onClick={undefined} label="Add Timetable" />
    </Box>
  );
};

export default AddFriendForm;
