import { Box, TextField, Typography } from '@mui/material'
import * as React from 'react';
import CustomButton from '../components/CustomButton';
import Timetable from '../components/Timetable';



const MyTimetable = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: (theme) => theme.spacing(2),p: (theme) => theme.spacing(2) }} > 
        <Typography>NUSMods Link: </Typography>
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
        />
        <CustomButton label="Add" onClick={undefined} />
      </Box >
      <Timetable />
    </Box >
  )
}

export default MyTimetable
