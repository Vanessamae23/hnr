import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import StaticTimeTable from '../components/StaticTimetable'
import useLocalStorage from '../helpers/useLocalStorage'
import { LOCALSTORAGE_KEY_GENERATED_TIMETABLE } from '../constants/constants'
import { default_GeneratedTimetable } from '../defaults/default'
import { GeneratedTimetable } from '../types/types'
import LinkExport from '../components/LinkExport'


function Matched() {
  const navigate = useNavigate();
  const idParam = useParams().id;

  if (idParam === undefined || idParam === null) {
    navigate("/friends")
  }
  const id = parseInt(idParam as string)

  const [generatedTimetable, setGeneratedTimetable] =
    useLocalStorage<GeneratedTimetable>(
      LOCALSTORAGE_KEY_GENERATED_TIMETABLE,
      default_GeneratedTimetable
    );

  if (id >= generatedTimetable.generatedPeople.length) {
    // Consider throwing some error
    navigate("/config")
  }

  const person = generatedTimetable.generatedPeople[id];

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", my: 4 }}>
        <LinkExport timetableLink={person.link} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <StaticTimeTable classes={person.classes} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "start", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            sx={{ borderColor: "grey.300", "&:hover": { bgcolor: "grey.100" } }}
            onClick={() => navigate("/matched")}
          >
            Back to Generated Timetables
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Matched