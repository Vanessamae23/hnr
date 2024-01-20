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

function AllMatched() {
  const [generatedTimetable, setGeneratedTimetable] =
    useLocalStorage<GeneratedTimetable>(
      LOCALSTORAGE_KEY_GENERATED_TIMETABLE,
      default_GeneratedTimetable
    );
  console.log(generatedTimetable.generatedPeople);
  const me = generatedTimetable.generatedPeople.find(
    (person) => person.name === "me"
  );
  const friends = generatedTimetable.generatedPeople.filter(
    (person) => person.name !== "me"
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
        <Typography variant="h5" sx={{ mx: 2 }} gutterBottom>
          My Timetable
        </Typography>
        <Typography variant="body1" sx={{ mx: 2 }} gutterBottom>
          {me?.link}
        </Typography>
        <StaticTimetable classes={me?.classes} />
      </Box>
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
        <Typography variant="h5" sx={{ mx: 2 }} gutterBottom>
          Friends' Timetable
        </Typography>
        <List>
          {friends.map((friend: GeneratedPerson, index: number) => (
            <ListItem key={index}>
              <ListItemText primary={friend.name} secondary={friend.link} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default AllMatched;
