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
import Timetable from "../components/Timetable";
import useLocalStorage from "../helpers/useLocalStorage";
import { Blockout, LocalStorage_Me } from "../types/types";
import { default_LocalStorage_Me } from "../defaults/default";
import { LOCALSTORAGE_KEY_ME } from "../constants/constants";
import BlockOutForm from "../components/BlockOutForm";

const MyTimetable = () => {
  const [person, setPerson] = useLocalStorage<LocalStorage_Me>(
    LOCALSTORAGE_KEY_ME,
    default_LocalStorage_Me
  );
  const [linkForm, setLinkForm] = React.useState(person.link)
  const [link, setLink] = React.useState(person.link)

  const find = (linkForm) => {
    setLink(linkForm);
    person.link = linkForm;
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

  function formatISODateToAMPM(isoDate: string): string {
    const date = new Date(isoDate);

    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine if it's AM or PM
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Add leading zero to minutes if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    // Construct the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

    return formattedTime;
  }

  const parsedBlockout = person.blockout ? person.blockout : [];

  console.log(person);

  
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
            variant="filled"
            sx ={{ width: "60%"}}
            value={linkForm}
            onChange={(e) => setLinkForm(e.target.value)}
          />
          <CustomButton label="Import" onClick={() => find(linkForm)} disabled={linkForm === link}/>
        </Box>
        {link.length > 0 ? <Timetable person={person} peopleId={0} link={link} /> : <></>}
        <Box sx={{ margin: "16px p", padding: "64px" }}>
          <BlockOutForm onBlockOut={handleAddBlockOut} />
          <List>
            {parsedBlockout.map((blockout: Blockout, index: number) => (
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
