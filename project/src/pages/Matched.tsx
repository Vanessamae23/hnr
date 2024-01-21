import React, { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import StaticTimeTable from '../components/StaticTimetable'
import useLocalStorage from '../helpers/useLocalStorage'
import { LOCALSTORAGE_KEY_GENERATED_TIMETABLE } from '../constants/constants'
import { default_GeneratedTimetable } from '../defaults/default'
import { GeneratedTimetable } from '../types/types'
import LinkExport from '../components/LinkExport'
import { default_Person } from '../defaults/default'

function Matched() {
  const navigate = useNavigate();
  const idParam = useParams().id;
  const [generatedTimetable, setGeneratedTimetable] =
  useLocalStorage<GeneratedTimetable>(
    LOCALSTORAGE_KEY_GENERATED_TIMETABLE,
    default_GeneratedTimetable
  );

  const id = parseInt(idParam as string)
  useEffect(() => {
    console.log(id)
    if (!id || id >= generatedTimetable.generatedPeople.length) {
      navigate("/config")
    }
  }, [])
  const person = id < generatedTimetable.generatedPeople.length ? generatedTimetable.generatedPeople[id] : default_Person;

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