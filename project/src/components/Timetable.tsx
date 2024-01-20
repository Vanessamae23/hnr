import React from "react";
import { Epg, Layout } from "planby";

// Import hooks
import { useApp } from "../useApp";
import { Timeline } from "./Timeline";
import { ModuleItem } from "./ModuleItem";
import { DayItem } from "./DayItem";
import { Box } from "@mui/material";

const TimeTable = ({ classes, setClasses, name }) => {
  const { isLoading, getEpgProps, getLayoutProps, toggleLock } = useApp(
    classes,
    name
  );
  return (
    <Box style={{ width: "100%" }}>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => {
            return (
              <Box onClick={() => toggleLock(program.data.id, classes, setClasses)}>
                <ModuleItem key={program.data.id} program={program} {...rest} />
              </Box>
            );
          }}
          renderChannel={({ channel }) => (
            <DayItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </Box>
  );
};

export default TimeTable;
