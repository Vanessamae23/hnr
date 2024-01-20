import { Box, TextField, Typography } from "@mui/material";
import * as React from "react";
import CustomButton from "../components/CustomButton";
import Timetable from "../components/Timetable";

const MyTimetable = () => {
  const link = "https://nusmods.com/timetable/sem-2/share?BSP1703=TUT:D07,LEC:D2&CS2030S=LAB:12A,REC:02,LEC:1&CS2101=&CS2103T=LEC:G09&CS2109S=TUT:21,LEC:1&CS3230=TUT:02,LEC:1&FIN3701B=SEC:B2"
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
          />
          <CustomButton label="Add" onClick={undefined} />
        </Box>
        <Timetable link={link}/>
      </Box>
    </Box>
  );
};

export default MyTimetable;
