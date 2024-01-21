import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import useLocalStorage from "../helpers/useLocalStorage";
import { GeneratedPerson } from "../types/types";
import { LOCALSTORAGE_KEY_GENERATED_TIMETABLE } from "../constants/constants";
import { default_GeneratedTimetable } from "../defaults/default";
import { GeneratedTimetable } from "../types/types";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CustomButton from "../components/CustomButton";
import { Grid } from "@mui/material";
import { localStorageToModels } from "../utils/data";
import { LocalStorage_Groups } from "../types/types";
import { default_LocalStorage_Groups } from "../defaults/default";
import { LocalStorage_Me } from "../types/types";
import { default_LocalStorage_Me } from "../defaults/default";
import { LocalStorage_Friends } from "../types/types";
import { default_LocalStorage_Friends } from "../defaults/default";
import { LOCALSTORAGE_KEY_GROUPS, LOCALSTORAGE_KEY_ME, LOCALSTORAGE_KEY_FRIENDS } from "../constants/constants";
import StaticTimeTable from "../components/StaticTimetable";
import LinkExport from "../components/LinkExport";
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import { useState } from "react";


function AllMatched() {
  const navigate = useNavigate();

  const [classes, setClasses] = useLocalStorage<LocalStorage_Groups>(
    LOCALSTORAGE_KEY_GROUPS,
    default_LocalStorage_Groups
  );
  const [meLoc, setMeLoc] = useLocalStorage<LocalStorage_Me>(
    LOCALSTORAGE_KEY_ME,
    default_LocalStorage_Me
  );
  const [friendsLoc, setFriendsLoc] = useLocalStorage<LocalStorage_Friends>(
    LOCALSTORAGE_KEY_FRIENDS,
    default_LocalStorage_Friends
  );

  const [generatedTimetable, setGeneratedTimetable] =
    useLocalStorage<GeneratedTimetable>(
      LOCALSTORAGE_KEY_GENERATED_TIMETABLE,
      default_GeneratedTimetable
    );

  const [open, setOpen] = useState(false)
  
  const me = generatedTimetable.generatedPeople.find(
    (person) => person.name === "me"
  );
  const friends = generatedTimetable.generatedPeople.filter(
    (person) => person.name !== "me"
  );

  const handleSubmit = () => {
    localStorageToModels(
      meLoc,
      friendsLoc,
      classes,
      generatedTimetable,
      setGeneratedTimetable
    );
    navigate("/matched");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <>
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Box sx={{ typography: "h4", fontWeight: "bold" }}>
        My timetable
      </Box>
      <CustomButton
          label="Re-Match"
          onClick={handleSubmit}
        />
      </Box>
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <LinkExport timetableLink={me!.link} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <StaticTimeTable classes={me!.classes} />
      </Box>
    </Box>
    <Box sx={{ typography: "h4", fontWeight: "bold" }}>
        Friends' Timetables
      </Box>
      <List>
        {friends.map((friend: GeneratedPerson, index: number) => (
          <ListItem sx={{ marginBottom: 5, padding: 3, borderBottom: '1px solid black' }} key={index}>
            <Grid container>
              <Grid sx={{ flexDirection: 'row', justifyContent: 'flex-start', display: 'flex', alignItems: 'center' }} item xs={8}>
                <AccountBoxIcon />
                <Typography px={3} variant="h6">{friend.name}</Typography>

              </Grid>
              <Grid item xs={4} sx={{ flexDirection: 'row', justifyContent: 'space-evenly', display: 'flex' }}>
                <a href={friend.link} ><Button variant="contained" color="success" style={{ backgroundColor: "#f97316" }}>NUSMods</Button></a>
                <CustomButton label="View" onClick={() => navigate("/matched/" + index)} style={{ backgroundColor: "#0ea5e9" }} />
                <Tooltip title="Copy URL">
                  <Button onClick={handleCopy}>
                    <ContentCopyIcon />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "start", gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: "grey.300", "&:hover": { bgcolor: "grey.100" } }}
          onClick={() => navigate("/config")}
        >
          Back to Configurations
        </Button>
      </Box>
    </Box>
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={2000}
      message="Copied to clipboard"
    />
    </>
    
  );
}

export default AllMatched;
