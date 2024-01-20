import React from "react";
import { Epg, Layout, Program, ProgramItem } from "planby";

// Import hooks
import { useApp, useFriendApp } from "../useApp";
import { Timeline } from "./Timeline";
import { ModuleItem } from "./ModuleItem";
import { DayItem } from "./DayItem";
import { classesToPrograms, modulestoClasses } from "../utils/data";
import { linkToClasses } from "../utils/utils";
import { Person } from "../types/types";


const FriendTimetable = ({link, name, person}) => {
    console.log(classesToPrograms(person.classes))
  const { isLoading, getEpgProps, getLayoutProps, toggleLock } = useFriendApp(classesToPrograms(person.classes), name);
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => {
            return (
              <div onClick={() => toggleLock(program.data.id)}>
                <ModuleItem  key={program.data.id} program={program} {...rest} />
              </div>
            )
            
          }}
          renderChannel={({ channel }) => (
            <DayItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </div>
  )
}

export default FriendTimetable
