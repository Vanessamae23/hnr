import React from "react";
import { Epg, Layout, Program, ProgramItem } from "planby";

// Import hooks
import { useApp, useFriendApp } from "../useApp";
import { Timeline } from "./Timeline";
import { ModuleItem } from "./ModuleItem";
import { DayItem } from "./DayItem";
import { classesToPrograms, modulestoClasses } from "../utils/data";
import { linkToClasses } from "../utils/utils";
import { Blockout, Person } from "../types/types";
import { Box, List, ListItem, ListItemText, Button } from "@mui/material";
import BlockOutForm from "../components/BlockOutForm";
import { formatISODateToAMPM } from "../utils/utils";

const FriendTimetable = ({ link, name, person }) => {
  const {
    isLoading,
    getEpgProps,
    getLayoutProps,
    toggleLock,
    handleAddBlockOut,
    handleDeleteBlockOut,
    parsedBlockout,
  } = useFriendApp(classesToPrograms(person.classes), name);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <div style={{ height: "60vh", width: "100%" }}>
        <Epg isLoading={isLoading} {...getEpgProps()}>
          <Layout
            {...getLayoutProps()}
            renderTimeline={(props) => <Timeline {...props} />}
            renderProgram={({ program, ...rest }) => {
              return (
                <div onClick={() => toggleLock(program.data.id)}>
                  <ModuleItem
                    key={program.data.id}
                    program={program}
                    {...rest}
                  />
                </div>
              );
            }}
            renderChannel={({ channel }) => (
              <DayItem key={channel.uuid} channel={channel} />
            )}
          />
        </Epg>
      </div>
      <Box sx={{ margin: "16px p", padding: "64px" }}>
        <BlockOutForm onBlockOut={handleAddBlockOut} />
        <List>
          {parsedBlockout.map((blockout: Blockout, index: number) => (
            <ListItem key={index}>
              <ListItemText
                primary={blockout.day}
                secondary={
                  blockout.startTime && blockout.endTime
                    ? formatISODateToAMPM(blockout.startTime) +
                      " - " +
                      formatISODateToAMPM(blockout.endTime)
                    : ""
                }
              />
              <Button onClick={() => handleDeleteBlockOut(index)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default FriendTimetable;
