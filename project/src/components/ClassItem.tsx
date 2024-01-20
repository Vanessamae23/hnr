import React from "react";
import {
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

interface ClassItemProps {
  id: string;
  moduleName: string;
  classType: string;
  onDelete: (id: string) => void;
  friendNames: string[];
  handleEditFriends: (id: string, friends: string[]) => void;
  friends: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[]) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? "normal" : "bold",
  };
}

const ClassItem: React.FC<ClassItemProps> = ({
  id,
  moduleName,
  classType,
  onDelete,
  friendNames,
  handleEditFriends,
  friends,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    handleEditFriends(id, typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        mb: 2,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        fontFamily="monospace"
        sx={{ opacity: "50%" }}
      >{`${moduleName} ${classType}`}</Typography>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Match with</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={friends as any}
          onChange={handleChange}
          input={<OutlinedInput label="Match with" />}
          MenuProps={MenuProps}
        >
          {friendNames.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, friends)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => onDelete(id)}
        sx={{ m: 1 }}
      >
        Delete
      </Button>
    </Box>
  );
};

export default ClassItem;
