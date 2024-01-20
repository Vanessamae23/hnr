import React from "react";
import { Epg, Layout } from "planby";

// Import hooks
import { useApp } from "../useApp";
import { Timeline } from "./Timeline";
import { ModuleItem } from "./ModuleItem";
import { DayItem } from "./DayItem";

const epg = [
  {
    id: "0",
    since: "2024-01-20T08:00:00",
    till: "2024-01-20T09:00:00",
    title: "CS3223",
    channelUuid: "0",
    locked: false,
    description: "Database Implementation"
  },
  {
    id: "1",
    since: "2024-01-20T08:00:00",
    till: "2024-01-20T09:00:00",
    title: "CS3223",
    channelUuid: "1",
    locked: false,
    description: "Database Implementation"
  },
  {
    id: "2",
    since: "2024-01-20T08:00:00",
    till: "2024-01-20T09:00:00",
    title: "CS3223",
    channelUuid: "2",
    locked: false,
    description: "Database Implementation"
  },
  {
    id: "3",
    since: "2024-01-20T10:00:00",
    till: "2024-01-20T11:00:00",
    title: "CS3233",
    channelUuid: "2",
    locked: false,
    description: "Hard module"
  },
];


const Timetable = () => {

  const { isLoading, getEpgProps, getLayoutProps } = useApp(epg);
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => (
            <ModuleItem key={program.data.id} program={program} {...rest} />
          )}
          renderChannel={({ channel }) => (
            <DayItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </div>
  )
}

export default Timetable
