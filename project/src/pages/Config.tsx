import React from "react";
import ClassForm from "../components/ClassForm";
import ClassList from "../components/ClassList";
import { Button, Box } from "@mui/material";
import useLocalStorage from "../helpers/useLocalStorage";
import { Person, Group, LocalStorage_Groups } from "../types/types";

function Config() {
  
  const [classes, setClasses] = useLocalStorage<LocalStorage_Groups>(
    "groups",
    []
  );

  const handleAddClass = (newClass: Group) => {
    setClasses([...classes, newClass]);
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((classInfo) => classInfo.id !== id));
  };

  const handleEditFriends = (id: string, friends: string[]) => {
    const updatedClasses = [...classes];
    const index = updatedClasses.findIndex((classInfo) => classInfo.id === id);
    updatedClasses[index].persons = friends;
    setClasses(updatedClasses);
  }

  const getFriendNames = (): string[] => {
    const friendsData = localStorage.getItem("friends");
    if (friendsData) {
      const friends: Person[] = JSON.parse(friendsData);
      return friends.map((friend) => friend.name);
    }
    return [];
  };

  const friendNames = getFriendNames();

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "start",
            gap: 2,
          }}
        >
          <Box sx={{ typography: "h4", fontWeight: "bold" }}>
            Classes to Match
          </Box>
          <ClassForm onAddClass={handleAddClass} />
        </Box>

        <ClassList classes={classes} onDelete={handleDeleteClass} friendNames={friendNames} handleEditFriends={handleEditFriends}/>

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            sx={{ borderColor: "grey.300", "&:hover": { bgcolor: "grey.100" } }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "orange.500", "&:hover": { bgcolor: "orange.700" } }}
          >
            Match!
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Config;
