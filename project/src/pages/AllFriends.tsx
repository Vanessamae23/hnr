import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddFriendForm from "../components/AddFriendForm";
import useLocalStorage from "../helpers/useLocalStorage";
import { TransitionProps } from "@mui/material/transitions";
import Slide from '@mui/material/Slide';
import FriendTimetable from "../components/FriendTimetable";
import { AddFriendInput, Person } from "../types/types";
import { linkToClasses } from "../utils/utils";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function AllFriends() {
  const [friends, setFriends] = useLocalStorage<Person[]>("friends", []);
  const [currentFriend, setCurrentFriend] = useState<Person | null>(null)
  const [currentFriendId, setCurrentFriendId] = useState<any>(null)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addFriend = (friend: AddFriendInput) => {
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

  const viewFriend = (index) => {
    setCurrentFriend(friends[index]);
    setCurrentFriendId(index)
    setOpen(true);
  }

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
            <Button onClick={() => viewFriend(index)}>View</Button>
            <Button onClick={() => deleteFriend(index)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      {open && currentFriend != null && (
        <Dialog
        open={open}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Friend timetable</DialogTitle>
        <DialogContent>
          <FriendTimetable key={currentFriend.name} link={currentFriend.link} person={currentFriend} name={currentFriend.name} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      )}


    </Box>
  );
}

export default AllFriends;
