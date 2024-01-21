import React, { useEffect } from "react";
// @ts-ignore
import logoModMatch from "../assets/modmatch-logo.png";
// @ts-ignore
import logoNusMods from "../assets/nusmods-logo.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../helpers/useLocalStorage";
import { linkToClasses } from "../utils/utils";
import { default_LocalStorage_Me } from "../defaults/default";
import { LOCALSTORAGE_KEY_ME } from "../constants/constants";
import { LocalStorage_Me } from "../types/types";
import { checkLinkValidity } from "../utils/errors";

function Home() {
  const [link, setLink] = useState("");

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [myData, setMyData] = useLocalStorage<LocalStorage_Me>(
    LOCALSTORAGE_KEY_ME,
    default_LocalStorage_Me
  );
  const navigate = useNavigate();

  const showSnackBar = (message) => {
    setOpen(true);
    setSnackbarMessage(message);
  };

  //   Go straight to timetable if link is already stored
  useEffect(() => {
    console.log("checking");
    console.log(myData.link);
    if (myData.link !== "") navigate("/timetable");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = checkLinkValidity(link);
    isValid
      .then((res) => {
        myData.link = link;
        myData.classes = linkToClasses(link);
        setMyData(myData);
        navigate("/timetable");
      })
      .catch((err) => {
        alert(err);
        showSnackBar("Invalid URL");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        maxWidth="sm"
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ display: "flex", alignItems: "end" }}>
            <Box
              component="img"
              sx={{ height: 100, width: 100 }}
              alt="ModMatch logo"
              src={logoModMatch}
            />
            <Box>
              <Typography fontWeight="500" fontSize={56} letterSpacing={3}>
                od
              </Typography>
            </Box>
            <Box
              component="img"
              sx={{ height: 100, width: 100 }}
              alt="ModMatch logo"
              src={logoNusMods}
            />
            <Box>
              <Typography fontWeight="500" fontSize={56} letterSpacing={3}>
                atch
              </Typography>
            </Box>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your NUSMods timetable link..."
            margin="normal"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            sx={{ marginBottom: 4 }}
            InputProps={{
              style: {
                borderRadius: "15px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{ marginY: 2 }}
            size="large"
            style={{
              backgroundColor: "#FF963F",
              color: "#000000",
              fontWeight: "bold",
            }}
            type="submit"
          >
            Start Matching
          </Button>
          <Typography variant="body2" color="#CFCFCF" align="center">
            Humbly brought to you by{" "}
            <Typography
              variant="body2"
              color="#FF3C3C"
              sx={{ fontWeight: "bold" }}
              display="inline"
            >
              {" "}
              AAC++
            </Typography>
          </Typography>
        </Grid>
      </Container>
    </form>
  );
}

export default Home;
