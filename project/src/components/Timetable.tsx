import React from "react";
import { Epg, Layout, Program, ProgramItem } from "planby";

// Import hooks
import { useApp } from "../useApp";
import { Timeline } from "./Timeline";
import { ModuleItem } from "./ModuleItem";
import { DayItem } from "./DayItem";
import { classesToPrograms, modulestoClasses } from "../utils/data";
import { linkToClasses } from "../utils/utils";

const epg = [
  {
    id: "0",
    since: "2024-01-20T08:00:00",
    till: "2024-01-20T09:00:00",
    title: "CS3223",
    channelUuid: "0",
    locked: false,
    image: "",
    description: "Database Implementation"
  },
  {
    id: "1",
    since: "2024-01-20T08:00:00",
    till: "2024-01-20T09:00:00",
    title: "CS3223",
    channelUuid: "1",
    locked: false,
    description: "Database Implementation",
    image: "https://via.placeholder.com/150"
  },
  {
    id: "2",
    since: "2024-01-20T08:00:00",
    till: "2024-01-20T09:00:00",
    title: "CS3223",
    channelUuid: "2",
    locked: false,
    image: "",
    description: "Database Implementation"
  },
  {
    id: "3",
    since: "2024-01-20T10:00:00",
    till: "2024-01-20T11:00:00",
    title: "CS3233",
    channelUuid: "2",
  image: "https://via.placeholder.com/150",
    locked: false,
    description: "Hard module"
  },
];


const Timetable = () => {

  const { isLoading, getEpgProps, getLayoutProps, toggleLock } = useApp(classesToPrograms(linkToClasses("https://nusmods.com/timetable/sem-2/share?BSP1703=TUT:D07,LEC:D2&CS2030S=LAB:12A,REC:02,LEC:1&CS2101=&CS2103T=LEC:G09&CS2109S=TUT:21,LEC:1&CS3230=TUT:02,LEC:1&FIN3701B=SEC:B2")));
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

export default Timetable
