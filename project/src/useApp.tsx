import React from "react";
import { fetchChannels } from "./helpers";
import { Channel, Program, useEpg } from "planby";
import { theme } from "./helpers/theme";
import { classesToPrograms, programsToClasses } from "./utils/data";
import { Class } from "./types/types";

export function useApp(classList: Class[], personName) {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [epg, setEpg] = React.useState<Program[]>(classesToPrograms(classList));
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const channelsData = React.useMemo(() => channels, [channels]);
  const epgData = React.useMemo(() => epg, [epg]);

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: 1500,
    sidebarWidth: 60,
    itemHeight: 70,
    isSidebar: true,
    isTimeline: true,
    isLine: true,
    startDate: "2024-01-20T07:00:00",
    endDate: "2024-01-20T23:00:00",
    isBaseTimeFormat: true,
    theme,
  });

  const toggleLock = (programId, classes, setClasses) => {
    setEpg((prevEpg) => {
      const updatedClasses = classes;
      const updatedEpg = prevEpg.map((program, index) => {
        if (program.id === programId) {
          updatedClasses[index].locked = !updatedClasses[index].locked;
          return { ...program, locked: !program.locked };
        } else {
          return program;
        }
      }
      );
      setClasses(updatedClasses);
      return updatedEpg;
    });
  };

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(true);
    const channels = await fetchChannels();
    setChannels(channels as Channel[]);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return {
    getEpgProps,
    getLayoutProps,
    toggleLock,
    isLoading,
  };
}

export function useStaticApp(epgList: Program[]) {
    const [channels, setChannels] = React.useState<Channel[]>([]);
    const [epg, setEpg] = React.useState<Program[]>(epgList);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    const channelsData = React.useMemo(() => channels, [channels]);
    const epgData = React.useMemo(() => epg, [epg]);
  
    const { getEpgProps, getLayoutProps } = useEpg({
      channels: channelsData,
      epg: epgData,
      dayWidth: 1500,
      sidebarWidth: 60,
      itemHeight: 70,
      isSidebar: true,
      isTimeline: true,
      isLine: true,
      startDate: "2024-01-20T07:00:00",
      endDate: "2024-01-20T23:00:00",
      isBaseTimeFormat: true,
      theme,
    });
  
 
    const handleFetchResources = React.useCallback(async () => {
      setIsLoading(true);
      const channels = await fetchChannels();
      setChannels(channels as Channel[]);
      setIsLoading(false);
    }, []);
  
    React.useEffect(() => {
      handleFetchResources();
    }, [handleFetchResources]);
  
    return {
      getEpgProps,
      getLayoutProps,
      isLoading,
    };
  }
  