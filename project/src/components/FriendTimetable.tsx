import React from "react";
import { Epg, Layout, Program, ProgramItem } from "planby";

// Import hooks
import { useApp, useFriendApp } from "../useApp";
import { Timeline } from "./Timeline";
import { ModuleItem } from "./ModuleItem";
import { DayItem } from "./DayItem";
import { classesToPrograms, modulestoClasses } from "../utils/data";

const FriendTimetable = ({ classes, setClasses, friendName }) => {
  const { isLoading, getEpgProps, getLayoutProps, toggleLock } = useFriendApp(
    classesToPrograms(classes),
    friendName
  );
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => {
            return (
              <div onClick={() => toggleLock(program.data.id, classes, setClasses)}>
                <ModuleItem key={program.data.id} program={program} {...rest} />
              </div>
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

export default FriendTimetable;
