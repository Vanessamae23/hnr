import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddFriendForm from "../components/AddFriendForm";
import useLocalStorage from "../helpers/useLocalStorage";
import { AddFriendInput, Person } from "../types/types";
import { linkToClasses } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CustomButton from "../components/CustomButton";
import { checkLinkValidity } from "../utils/errors";
import CloseIcon from '@mui/icons-material/Close';


function AllFriends() {
  const [friends, setFriends] = useLocalStorage<Person[]>("friends", []);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();

  const showSnackBar = (message) => {
    setOpen(true)
    setSnackbarMessage(message)
  }

  const addFriend = (friend: AddFriendInput) => {
    const usedNames = friends.map((friend) => friend.name);
    if (friend.name === "") {
      let friendIx = 1;
      do {
        friend.name = `Friend ${friendIx++}`;
      } while (usedNames.includes(friend.name))
    }

    const isValid = checkLinkValidity(friend.link)
    isValid.then((res) => {
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
      showSnackBar("Success")
    }).catch((err) => {
      alert(err)
      showSnackBar("Invalid URL")
    })

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
          <ListItem sx={{ marginBottom: 5, padding: 3, borderBottom: '1px solid black' }} key={index}>
            <Grid container>
              <Grid sx={{ flexDirection: 'row', justifyContent: 'flex-start', display: 'flex', alignItems: 'center' }} item xs={8}>
                <AccountBoxIcon />
                <Typography px={3} variant="h6">{friend.name}</Typography>

              </Grid>
              <Grid item xs={4} sx={{ flexDirection: 'row', justifyContent: 'space-evenly', display: 'flex' }}>
                <a href={friend.link} ><Button variant="contained" color="success" style={{ backgroundColor: "#f97316" }}>NUSMods</Button></a>
                <CustomButton label="View" onClick={() => navigate("/friends/" + index)} style={{ backgroundColor: "#0ea5e9" }} />
                <Button variant="contained" color="error" onClick={() => deleteFriend(index)} style={{ backgroundColor: "#ef4444" }}>Delete</Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Box>

  );
}

export default AllFriends;
