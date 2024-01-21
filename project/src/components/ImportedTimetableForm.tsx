import React, { useState } from "react";
import { TextField, Button, Box, FormControl } from "@mui/material";
import CustomButton from "./CustomButton";
import {Typography} from "@mui/material";
import { getCurrentUser } from "../backend/commands";
import { User } from "firebase/auth";

const ImportTimetableForm: React.FC<{
  onImport: (link: string) => void;
  onSave: () => void;
  initialValue: string;
}> = ({ onImport, initialValue="", onSave }) => {
  const [link, setLink] = useState(initialValue);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res)
    })
    
  }, [user])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onImport(link);
  };

  const handleSubmitSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave();
  };

  return (
    <FormControl>
        <Box
            sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: (theme) => theme.spacing(2),
            p: (theme) => theme.spacing(2),
            }}
        >
            <Typography>NUSMods Link: </Typography>

            <TextField
            id="filled-search"
            type="search"
            variant="outlined"
            sx={{ width: "60%", borderRadius: 20 }}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            />
            <CustomButton
            label="Import"
            onClick={handleSubmit}
            disabled={link === initialValue}
            />
             <CustomButton
            label="Save"
            onClick={handleSubmitSave}
            disabled={user === null}
            />
        </Box>
    </FormControl>
  );
};

export default ImportTimetableForm;