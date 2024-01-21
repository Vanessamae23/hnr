import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import useLocalStorage from "../helpers/useLocalStorage";
import { GeneratedPerson, Person } from "../types/types";
import { LOCALSTORAGE_KEY_GENERATED_TIMETABLE } from "../constants/constants";
import { default_GeneratedTimetable } from "../defaults/default";
import { GeneratedTimetable } from "../types/types";
import StaticTimetable from "../components/StaticTimetable";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CustomButton from "../components/CustomButton";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';

function AllMatched() {
  const navigate = useNavigate();
  const [generatedTimetable, setGeneratedTimetable] =
    useLocalStorage<GeneratedTimetable>(
      LOCALSTORAGE_KEY_GENERATED_TIMETABLE,
      default_GeneratedTimetable
    );
  const me = generatedTimetable.generatedPeople.find(
    (person) => person.name === "me"
  );
  const friends = generatedTimetable.generatedPeople.filter(
    (person) => person.name !== "me"
  );

  console.log(generatedTimetable)

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <Box sx={{ typography: "h4", fontWeight: "bold" }}>
        Generated Timetables
      </Box>
      <List>
        {generatedTimetable.generatedPeople.map((friend: GeneratedPerson, index: number) => (
          <ListItem sx={{ marginBottom: 5, padding: 3, borderBottom: '1px solid black' }} key={index}>
            <Grid container>
              <Grid sx={{ flexDirection: 'row', justifyContent: 'flex-start', display: 'flex', alignItems: 'center' }} item xs={8}>
                <AccountBoxIcon />
                <Typography px={3} variant="h6">{friend.name}</Typography>

              </Grid>
              <Grid item xs={4} sx={{ flexDirection: 'row', justifyContent: 'space-evenly', display: 'flex' }}>
                <a href={friend.link} ><Button variant="contained" color="success" style={{ backgroundColor: "#f97316" }}>NUSMods</Button></a>
                <CustomButton label="View" onClick={() => navigate("/matched/" + index)} style={{ backgroundColor: "#0ea5e9" }} />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: "grey.300", "&:hover": { bgcolor: "grey.100" } }}
          onClick={() => navigate("/config")}
        >
          Back
        </Button>
        <CustomButton
          label="Re-Match"
          onClick={() => undefined}
        />
      </Box>
    </Box>
    // <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
    //   <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
    //     <Typography variant="h5" sx={{ mx: 2 }} gutterBottom>
    //       My Timetable
    //     </Typography>
    //     <Typography variant="body2" sx={{ mx: 2 }} gutterBottom>
    //       {me?.link}
    //     </Typography>
    //     <StaticTimetable classes={me?.classes} />
    //   </Box>
    //   <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
    //     <Typography variant="h5" sx={{ mx: 2 }} gutterBottom>
    //       Friends' Timetable
    //     </Typography>
    //     <List>
    //       {friends.map((friend: GeneratedPerson, index: number) => (
    //         <ListItem key={index}>
    //           <ListItemText primary={friend.name} secondary={friend.link} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </Box>
    // </Box>
  );
}

export default AllMatched;
