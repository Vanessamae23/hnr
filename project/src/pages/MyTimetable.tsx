import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import * as React from "react";
import CustomButton from "../components/CustomButton";
import useLocalStorage from "../helpers/useLocalStorage";
import { Blockout, LocalStorage_Me } from "../types/types";
import { default_LocalStorage_Me } from "../defaults/default";
import { LOCALSTORAGE_KEY_ME } from "../constants/constants";
import BlockOutForm from "../components/BlockOutForm";
import { formatISODateToAMPM } from "../utils/utils";
import { linkToClasses } from "../utils/utils";
import TimeTable from "../components/Timetable";
import {Class} from "../types/types";

const MyTimetable = () => {
  const [person, setPerson] = useLocalStorage<LocalStorage_Me>(
    LOCALSTORAGE_KEY_ME,
    default_LocalStorage_Me
  );
  const setClasses = (classes: Class[]) : void => {
    const updatedPerson = { ...person, classes: classes };
    setPerson(updatedPerson);
  }

  console.log(person);
  const [linkForm, setLinkForm] = React.useState(person.link)
  const [link, setLink] = React.useState(person.link)

  const find = (linkForm) => {
    setLink(linkForm);
    person.link = linkForm;
    person.classes = linkToClasses(linkForm);
    setPerson(person);
  };

  const handleAddBlockOut = (blockOut: {
    day: string;
    startTime: string;
    endTime: string;
  }) => {
    const updatedBlockout = [...person.blockout, blockOut];
    const updatedPerson = { ...person, blockout: updatedBlockout };
    setPerson(updatedPerson);
  };

  const handleDeleteBlockOut = (index: number) => {
    const updatedBlockout = [...person.blockout];
    updatedBlockout.splice(index, 1);
    const updatedPerson = { ...person, blockout: updatedBlockout };
    setPerson(updatedPerson);
  };
  
  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            value={linkForm}
            onChange={(e) => setLinkForm(e.target.value)}
          />
          <CustomButton
            label="Import"
            onClick={() => find(linkForm)}
            disabled={linkForm === link}
          />
        </Box>
        <TimeTable classes={person.classes} setClasses={setClasses} name={""}/>
        <Box sx={{ margin: "16px p", padding: "64px" }}>
          <BlockOutForm onBlockOut={handleAddBlockOut} />
          <List>
            {person.blockout.map((blockout: Blockout, index: number) => (
              <ListItem key={index}>
                <ListItemText
                  primary={blockout.day}
                  secondary={
                    blockout.startTime && blockout.endTime
                      ? formatISODateToAMPM(blockout.startTime) +
                        " - " +
                        formatISODateToAMPM(blockout.endTime)
                      : ""
                  }
                />
                <Button onClick={() => handleDeleteBlockOut(index)}>
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default MyTimetable;
