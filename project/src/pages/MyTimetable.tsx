import { getClassesDatabase, getCurrentUser, writeClass } from "../backend/commands";
import { User } from "firebase/auth";
import { Box, List, ListItem, ListItemText, Button } from "@mui/material";
import * as React from "react";
import useLocalStorage from "../helpers/useLocalStorage";
import { Blockout, LocalStorage_Me } from "../types/types";
import { default_LocalStorage_Me } from "../defaults/default";
import { LOCALSTORAGE_KEY_ME } from "../constants/constants";
import BlockOutForm from "../components/BlockOutForm";
import { formatISODateToAMPM } from "../utils/utils";
import { linkToClasses } from "../utils/utils";
import TimeTable from "../components/Timetable";
import { Class } from "../types/types";
import ImportTimetableForm from "../components/ImportTimetableForm";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const MyTimetable = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useLocalStorage<LocalStorage_Me>(
    LOCALSTORAGE_KEY_ME,
    default_LocalStorage_Me
  );
  
  const setClasses = (classes: Class[]) : void => {
    const updatedPerson = { ...person, classes: classes };
    setPerson(updatedPerson);
  };

  const [user, setUser] = React.useState<User | null>(null)
  const [link, setLink] = React.useState(person.link);

  const find = (link: string) => {
    setLink(link);
    person.link = link;
    person.classes = linkToClasses(link);
    setPerson(person);
  };


  const save = () => {
    writeClass(person.classes).then((res) => {
      alert(res)
    })
  }

  

  const handleAddBlockOut = (blockOut: {
    day: string;
    startTime: string;
    endTime: string;
  }) => {
    console.log(blockOut.startTime);
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

  React.useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res)
    })
  }, [user])

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {user == null ? (<ImportTimetableForm  onImport={find} initialValue={link}/>) : (<ImportTimetableForm  onSave={save} onImport={find} initialValue={link}/>)}
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
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
        <CustomButton
          label="Next"
          onClick={() => navigate("/friends")}
        />
      </Box>
    </Box>
  );
};

export default MyTimetable;