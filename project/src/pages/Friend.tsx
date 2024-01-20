import React from "react";
import FriendTimetable from "../components/FriendTimetable";
import useLocalStorage from "../helpers/useLocalStorage";
import { LOCALSTORAGE_KEY_FRIENDS } from "../constants/constants";
import { Blockout, Class, Person } from "../types/types";
import { useParams, redirect } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import BlockOutForm from "../components/BlockOutForm";
import { formatISODateToAMPM } from "../utils/utils";

function Friend() {
  const [friends, setFriends] = useLocalStorage<Person[]>(
    LOCALSTORAGE_KEY_FRIENDS,
    []
  );
  const idParam = useParams().id;

  if (idParam === undefined || idParam === "") {
    redirect("/friends");
  }
  const id = parseInt(idParam as string);
  if (id >= friends.length) {
    redirect("/friends");
  }

  const friend = friends[id];
  const setClasses = (classes: Class[]) => {
    const updatedFriends = [...friends];
    updatedFriends[id].classes = classes;
    setFriends(updatedFriends);
  };

  const handleAddBlockOut = (blockOut: {
    day: string;
    startTime: string;
    endTime: string;
  }) => {
    const updatedFriends = [...friends];
    updatedFriends[id].blockout = [...friend.blockout, blockOut];
    setFriends(updatedFriends);
  };

  const handleDeleteBlockOut = (index: number) => {
    const updatedFriends = [...friends];
    updatedFriends[id].blockout.splice(index, 1);
    setFriends(updatedFriends);
  };

  const parsedBlockout = friend.blockout;

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <FriendTimetable
        friendName={friend.name}
        classes={friend.classes}
        setClasses={setClasses}
      />
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
  );
}

export default Friend;
