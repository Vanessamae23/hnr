import React from "react";
import ClassForm from "../components/ClassForm";
import ClassList from "../components/ClassList";
import { Button, Box } from "@mui/material";
import useLocalStorage from "../helpers/useLocalStorage";

interface ClassItem {
  id: string;
  moduleName: string;
  classType: string;
}

function Config() {
  const [classes, setClasses] = useLocalStorage<ClassItem[]>("classes", []);

  const handleAddClass = (newClass: ClassItem) => {
    setClasses([...classes, newClass]);
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((classInfo) => classInfo.id !== id));
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

        <ClassList classes={classes} onDelete={handleDeleteClass} />

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
