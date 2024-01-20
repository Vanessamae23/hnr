import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import AddFriendForm from "../components/AddFriendForm";
import useLocalStorage from "../helpers/useLocalStorage";
import { AddFriendInput, Person } from "../types/types";
import { linkToClasses } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CustomButton from "../components/CustomButton";

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
    },
    ]);
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
          <ListItem  sx={{  marginBottom: 5,  padding: 3, borderBottom: '1px solid black' }} key={index}>
            <Grid container>
              <Grid sx={{ flexDirection: 'row', justifyContent: 'flex-start', display: 'flex', alignItems: 'center'}} item xs={8}>
                <AccountBoxIcon />
                <Typography px={3} variant="h6">{friend.name}</Typography>
                
              </Grid>
              <Grid item xs={4} sx={{ flexDirection: 'row', justifyContent: 'space-evenly', display: 'flex'}}>
                <a href={friend.link} ><Button variant="contained" color="success">NUSMods</Button></a>
                <CustomButton label="View" onClick={() => navigate("/friends/" + index)} />
                <Button variant="contained" color="error" onClick={() => deleteFriend(index)}>Delete</Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AllFriends;
