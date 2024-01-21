import React from "react";
import { Epg, Layout, Program, ProgramItem } from "planby";

// Import hooks
import { useStaticApp } from "../useApp";
import { Timeline } from "./Timeline";
import { ModuleItem } from "./ModuleItem";
import { DayItem } from "./DayItem";
import {
  classesToPrograms,
} from "../utils/data";

const StaticTimetable = ({ classes }) => {
  const { isLoading, getEpgProps, getLayoutProps } = useStaticApp(classesToPrograms(classes == undefined ? [] : classes));

  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => {
            return (

              <ModuleItem key={program.data.id} program={program} {...rest} />
            );
          }}
          renderChannel={({ channel }) => (
            <DayItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </div>
  );
};

export default StaticTimetable;
