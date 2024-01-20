import React from "react";
import { Epg, Layout, Program, ProgramItem } from "planby";

// Import hooks
import { useApp } from "../useApp";
import { Timeline } from "./Timeline";
import { ModuleItem } from "./ModuleItem";
import { DayItem } from "./DayItem";
import {
  classesToPrograms,
  modulestoClasses,
  programsToClasses,
} from "../utils/data";
import { linkToClasses } from "../utils/utils";
import useLocalStorage from "../helpers/useLocalStorage";
import { LocalStorage_Me } from "../types/types";
import { default_LocalStorage_Me } from "../defaults/default";


const Timetable = ({ person, link, peopleId }) => {

  const { isLoading, getEpgProps, getLayoutProps, toggleLock } = useApp(classesToPrograms(person.classes.length === 0 ? linkToClasses(link) : person.classes));

  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => {
            return (
              <div onClick={() => toggleLock(program.data.id, peopleId)}>
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

export default Timetable;
