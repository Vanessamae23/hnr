import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import AddFriendForm from "../components/AddFriendForm";
import useLocalStorage from "../helpers/useLocalStorage";
import { AddFriendInput, Person } from "../types/types";
import { linkToClasses } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function AllFriends() {
  const [friends, setFriends] = useLocalStorage<Person[]>("friends", []);

  const navigate = useNavigate();

  const addFriend = (friend: AddFriendInput) => {
    const usedNames = friends.map((friend) => friend.name);
    if (friend.name === "") {
        let friendIx = 1;
        do {
            friend.name = `Friend ${friendIx++}`;
        } while (usedNames.includes(friend.name))
    }

    const newFriend = {
        name: friend.name,
        link: friend.link,
        blockout: [],
        classes: linkToClasses(friend.link),
    }

    for (let i = 0; i < friends.length; i++) {
        if (friends[i].name === friend.name) {
            friends[i] = newFriend;
            return;
        }
    }
    setFriends([...friends, {
        name: friend.name,
        link: friend.link,
        blockout: [],
        classes: linkToClasses(friend.link),
    }]);
  };

  const deleteFriend = (index: number) => {
    const updatedFriends = [...friends];
    updatedFriends.splice(index, 1);
    setFriends(updatedFriends);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <AddFriendForm onAddFriend={addFriend} />
      <List>
        {friends.map((friend: Person, index: number) => (
          <ListItem key={index}>
            <ListItemText
              primary={friend.name}
              secondary={friend.link}
            />
            <Button onClick={() => navigate("/friends/" + index)}>View</Button>
            <Button onClick={() => deleteFriend(index)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AllFriends;
