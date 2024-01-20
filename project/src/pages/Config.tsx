import React from "react";
import ClassForm from "../components/ClassForm";
import ClassList from "../components/ClassList";
import { Button, Box } from "@mui/material";
import useLocalStorage from "../helpers/useLocalStorage";
import CustomButton from "../components/CustomButton";
import {
  Person,
  Group,
  LocalStorage_Groups,
  LocalStorage_Me,
  LocalStorage_Friends,
} from "../types/types";
import {
  LOCALSTORAGE_KEY_FRIENDS,
  LOCALSTORAGE_KEY_ME,
  LOCALSTORAGE_KEY_GROUPS,
} from "../constants/constants";
import {
  default_LocalStorage_Me,
  default_LocalStorage_Groups,
  default_LocalStorage_Friends,
} from "../defaults/default";
import { getAllModuleCodes } from "../utils/data";

function Config() {
  const [classes, setClasses] = useLocalStorage<LocalStorage_Groups>(
    LOCALSTORAGE_KEY_GROUPS,
    default_LocalStorage_Groups
  );
  const [meLoc, setMeLoc] = useLocalStorage<LocalStorage_Me>(
    LOCALSTORAGE_KEY_ME,
    default_LocalStorage_Me
  );
  const [friendsLoc, _] = useLocalStorage<LocalStorage_Friends>(
    LOCALSTORAGE_KEY_FRIENDS,
    default_LocalStorage_Friends
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
  };

  const getFriendNames = (): string[] => {
    const friendsData = localStorage.getItem("friends");
    if (friendsData) {
      const friends: Person[] = JSON.parse(friendsData);
      return friends.map((friend) => friend.name);
    }
    return [];
  };

  const friendNames = getFriendNames();

  const handleSubmit = () => {
    console.log(meLoc);
    console.log(friendsLoc);
    console.log(classes);
  };

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

        <ClassList
          classes={classes}
          onDelete={handleDeleteClass}
          friendNames={friendNames}
          handleEditFriends={handleEditFriends}
        />

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            sx={{ borderColor: "grey.300", "&:hover": { bgcolor: "grey.100" } }}
          >
            Back
          </Button>
          <CustomButton label="Match" onClick={handleSubmit} disabled={classes.length == 0} />
        </Box>
      </Box>
    </Box>
  );
}

export default Config;
