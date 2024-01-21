import CustomButton from "../components/CustomButton";
import { getClassesDatabase, getCurrentUser, writeClass } from "../backend/commands";
import { User } from "firebase/auth";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import * as React from "react";
import useLocalStorage from "../helpers/useLocalStorage";
import { Blockout, LocalStorage_Me } from "../types/types";
import { default_LocalStorage_Me } from "../defaults/default";
import { LOCALSTORAGE_KEY_ME } from "../constants/constants";
import BlockOutForm from "../components/BlockOutForm";
import { formatISODateToAMPM } from "../utils/utils";
import { linkToClasses } from "../utils/utils";
import TimeTable from "../components/Timetable";
import {Class} from "../types/types";
import ImportTimetableForm from "../components/ImportedTimetableForm";
import StaticTimetable from "../components/StaticTimetable";

const SavedTimetable = () => {
  const [classes, setClasses] = React.useState<Class[] | null>(null)
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res)
      retrieve()
    })
    
  }, [user])

  const retrieve = () => {
    getClassesDatabase().then((res) => {
      if(res != null) {
        setClasses(res)
        console.log(`got user ${user?.uid}`)
      }
      
    })
  }
  
  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {classes !== null && classes.length > 0 && (<StaticTimetable classes={classes} />)}
        {classes === null || classes.length <= 0 ? (<Typography>Nothing to show</Typography>) : <></>}
      </Box>
    </Box>
  );
};

export default SavedTimetable;