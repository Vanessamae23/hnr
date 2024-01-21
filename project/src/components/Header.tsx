import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
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
  sample_LocalStorage_Groups,
  sample_LocalStorage_Me,
  sample_LocalStorage_Friends,
} from "../defaults/default";
import useLocalStorage from "../helpers/useLocalStorage";
import { linkToClasses } from "../utils/utils";

// @ts-ignore
import logoModMatch from "../assets/modmatch-logo.png";

export default function Header() {
  const navigate = useNavigate();

  const [classes, setClasses] = useLocalStorage<LocalStorage_Groups>(
    LOCALSTORAGE_KEY_GROUPS,
    default_LocalStorage_Groups
  );
  const [meLoc, setMeLoc] = useLocalStorage<LocalStorage_Me>(
    LOCALSTORAGE_KEY_ME,
    default_LocalStorage_Me
  );
  const [friendsLoc, setFriendsLoc] = useLocalStorage<LocalStorage_Friends>(
    LOCALSTORAGE_KEY_FRIENDS,
    default_LocalStorage_Friends
  );

  const handleDelete = () => {
    setMeLoc(default_LocalStorage_Me);
    window.localStorage.clear();
    navigate("/");
  };

  const handlePopulate = () => {
    console.log(sample_LocalStorage_Groups);
    setClasses(sample_LocalStorage_Groups);
    setMeLoc({
      ...sample_LocalStorage_Me,
      classes: linkToClasses(sample_LocalStorage_Me.link),
    });

    setFriendsLoc(
      sample_LocalStorage_Friends.map((friend) => ({
        ...friend,
        classes: linkToClasses(friend.link),
      }))
    );
    window.location.reload();
  };

  return (
    <AppBar
      sx={{
        flexDirection: "row",
        alignItems: "center",
        background: "#fff",
        width: "100%",
        backgroundColor: "#F3F3F3",
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logoModMatch}
            alt="ModMatch logo"
            style={{ height: 50, width: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 1, marginLeft: "auto" }} // Add marginLeft: "auto" to push the button to the right
            onClick={handlePopulate}
          >
            Sample Data
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ m: 1, marginLeft: "auto" }} // Add marginLeft: "auto" to push the button to the right
            onClick={handleDelete}
          >
            Clear Data
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
