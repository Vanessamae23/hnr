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

interface Friend {
  name: string;
  nusModsLink: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function AllFriends() {
  const [friends, setFriends] = useLocalStorage<Friend[]>("friends", []);
  const [currentFriend, setCurrentFriend] = useState<Friend | null>(null)
  const [currentFriendId, setCurrentFriendId] = useState<any>(null)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const viewFriend = (friend: Friend, index) => {
    setCurrentFriend(friend);
    setCurrentFriendId(index)
    setOpen(true);
  }

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
            <Button onClick={() => viewFriend(friend, index)}>View</Button>
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
            <FriendTimetable link={currentFriend.nusModsLink} peopleId={currentFriendId} />
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
