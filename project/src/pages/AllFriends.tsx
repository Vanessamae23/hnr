import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddFriendForm from "../components/AddFriendForm";
import useLocalStorage from "../helpers/useLocalStorage";

interface Friend {
  name: string;
  nusModsLink: string;
}

function AllFriends() {
  const [friends, setFriends] = useLocalStorage<Friend[]>("friends", []);

  const addFriend = (friend: Friend) => {
    setFriends([...friends, friend]);
    localStorage.setItem("friends", JSON.stringify([...friends, friend]));
  };

  const deleteFriend = (index: number) => {
    const updatedFriends = [...friends];
    updatedFriends.splice(index, 1);
    setFriends(updatedFriends);
    localStorage.setItem("friends", JSON.stringify(updatedFriends));
  };

  const storedFriends = localStorage.getItem("friends");
  const parsedFriends = storedFriends ? JSON.parse(storedFriends) : [];

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <AddFriendForm onAddFriend={addFriend} />
      <List>
        {parsedFriends.map((friend: Friend, index: number) => (
          <ListItem key={index}>
            <ListItemText
              primary={friend.name}
              secondary={friend.nusModsLink}
            />
            <Button onClick={() => deleteFriend(index)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AllFriends;
