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
import { formatISODateToAMPM, linkToClasses } from "../utils/utils";
import { User } from "firebase/auth";
import { getClasses, getCurrentUser, writeClass } from "../backend/commands";
import { modulestoClasses } from "../utils/data";

const MyTimetable = () => {
  const [person, setPerson] = useLocalStorage<LocalStorage_Me>(
    LOCALSTORAGE_KEY_ME,
    default_LocalStorage_Me
  );
  const [user, setUser] = React.useState<User | null>(null)
  const [linkForm, setLinkForm] = React.useState(person.link)
  const [link, setLink] = React.useState(person.link)
  const [classes, setClasses] = React.useState(person.classes)
  
  React.useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res)
      retrieve()
    })
    
  }, [person])


  const save = () => {
    writeClass(person.classes).then((res) => {
      alert(res)
    })
  }

  const retrieve = () => {
    getClasses().then((res) => {
      if(res) {
        setLinkForm("")
        person.classes = res
        setPerson(person)
      }
      
    })
  }

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

  const parsedBlockout = person.blockout ? person.blockout : [];

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
            //disabled={linkForm === link}
          />
          <CustomButton
            label="Save"
            onClick={() => save()}
            disabled={user === null || link === null}
          />
          <CustomButton
            label="Retrieve"
            onClick={() => retrieve()}
            disabled={user === null }
          />
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
