import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CustomButton from "./CustomButton";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const BlockOutForm: React.FC<{
  onBlockOut: (blockOut: {
    day: string;
    startTime: string;
    endTime: string;
  }) => void;
}> = ({ onBlockOut }) => {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = React.useState<Dayjs | null>(
    null
  );
  const [endTime, setEndTime] = React.useState<Dayjs | null>(
    null
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onBlockOut({
      day,
      startTime: startTime!.toISOString(),
      endTime: endTime!.toISOString()
    });
    setDay("");
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        mb: 4,
        alignItems: "center",
      }}
    >
      <Typography sx={{ typography: "h4", fontWeight: "bold" }}>Blockouts</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Select
          label="Day"
          variant="outlined"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          sx={{ width: "300px" }}
        >
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
          <MenuItem value="Thursday">Thursday</MenuItem>
          <MenuItem value="Friday">Friday</MenuItem>
          <MenuItem value="Saturday">Saturday</MenuItem>
        </Select>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e)}
            sx={{ width: "150px" }}
          />
          <TimePicker
            label="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e)}
            sx={{ width: "150px" }}
          />
        </LocalizationProvider>

        <CustomButton onClick={undefined} label="Add" disabled={day === "" || startTime === null || endTime === null} />
      </Box>
    </Box>
  );
};

export default BlockOutForm;
