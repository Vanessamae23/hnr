import { Box, TextField, Typography } from "@mui/material";
import * as React from "react";
import CustomButton from "../components/CustomButton";
import Timetable from "../components/Timetable";
import useLocalStorage from "../helpers/useLocalStorage";
import { LocalStorage_Me } from "../types/types";
import { default_LocalStorage_Me } from "../defaults/default";
import { programsToClasses } from "../utils/data";

const MyTimetable = () => {
  const [person, setPerson] = useLocalStorage<LocalStorage_Me>(
    "me",
    default_LocalStorage_Me
  );

    
  const [linkForm, setLinkForm] = React.useState(person.link)
  const [link, setLink] = React.useState(person.link)

  const find = (linkForm) => {
    setLink(linkForm)
    person.link = linkForm
    setPerson(person)
  }

  React.useEffect(() => {
    person.link = link
    setPerson(person)
  }, [link])

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: (theme) => theme.spacing(2),
            p: (theme) => theme.spacing(2),
          }}
        >
          <Typography>NUSMods Link: </Typography>
          <TextField
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            sx ={{ width: "60%"}}
            onChange={(e) => setLinkForm(e.target.value)}
          />
          <CustomButton label="Add" onClick={() => find(linkForm)} />
        </Box>
        {link.length > 0 ? (
          <Timetable key={link} peopleId={0} link={link} />
        ) : (
          <></>
        )}
        
      </Box>
    </Box>
  );
};

export default MyTimetable;
