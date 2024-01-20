import React, { useState } from "react";
import { TextField, Button, Box, FormControl } from "@mui/material";
import CustomButton from "./CustomButton";
import {Typography} from "@mui/material";

const ImportTimetableForm: React.FC<{
  onImport: (link: string) => void;
  initialValue: string;
}> = ({ onImport, initialValue="" }) => {
  const [link, setLink] = useState(initialValue);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onImport(link);
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
        </Box>
    </FormControl>
  );
};

export default ImportTimetableForm;
