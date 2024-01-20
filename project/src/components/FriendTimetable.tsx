import React from "react";
import { Epg, Layout, Program, ProgramItem } from "planby";

// Import hooks
import { useApp, useFriendApp } from "../useApp";
import { Timeline } from "./Timeline";
import { ModuleItem } from "./ModuleItem";
import { DayItem } from "./DayItem";
import { classesToPrograms, modulestoClasses } from "../utils/data";
import { linkToClasses } from "../utils/utils";


const FriendTimetable = ({link, peopleId}) => {

  const { isLoading, getEpgProps, getLayoutProps } = useFriendApp(classesToPrograms(linkToClasses(link)), peopleId);
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => (
            <ModuleItem  key={program.data.id} program={program} {...rest} />
           
            
  )}
          renderChannel={({ channel }) => (
            <DayItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </div>
  )
}

export default FriendTimetable
