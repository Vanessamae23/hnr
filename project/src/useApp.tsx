import React from "react";

import { fetchChannels, fetchEpg } from "./helpers";

import { Channel, Program, useEpg } from "planby";

import { theme } from "./helpers/theme";
import useLocalStorage from "./helpers/useLocalStorage";
import { LocalStorage_Me } from "./types/types";
import { convertProgramToClass } from "./utils/transform";
import { programsToClasses } from "./utils/data";
import { default_LocalStorage_Me } from "./defaults/default";

export function useApp(epgList: Program[]) {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [epg, setEpg] = React.useState<Program[]>(epgList);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const channelsData = React.useMemo(() => channels, [channels]);
  const epgData = React.useMemo(() => epg, [epg]);

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: 3000,
    sidebarWidth: 100,
    itemHeight: 100,
    isSidebar: true,
    isTimeline: true,
    isLine: true,
    startDate: "2024-01-20T07:00:00",
    endDate: "2024-01-20T21:00:00",
    isBaseTimeFormat: true,
    theme
  });

  const toggleLock = (programId, peopleId) => {
    setEpg((prevEpg) =>
      prevEpg.map((program) =>
        program.id === programId
          ? { ...program, locked: !program.locked }
          : program
      )
    );
    
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

  return { getEpgProps, getLayoutProps, toggleLock, isLoading };
}

export function useFriendApp(epgList: Program[], personName) {
    const [channels, setChannels] = React.useState<Channel[]>([]);
    const [epg, setEpg] = React.useState<Program[]>(epgList);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    const channelsData = React.useMemo(() => channels, [channels]);
    const epgData = React.useMemo(() => epg, [epg]);

    
  
    const { getEpgProps, getLayoutProps } = useEpg({
      channels: channelsData,
      epg: epgData,
      dayWidth: 3000,
      sidebarWidth: 100,
      itemHeight: 100,
      isSidebar: true,
      isTimeline: true,
      isLine: true,
      startDate: "2024-01-20T07:00:00",
      endDate: "2024-01-20T21:00:00",
      isBaseTimeFormat: true,
      theme
    });
  
    const toggleLock = (programId, peopleId) => {
        setEpg((prevEpg) =>
          prevEpg.map((program) =>
            program.id === programId
              ? { ...program, locked: !program.locked }
              : program
          )
        );
        
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
  
    return { getEpgProps, getLayoutProps, toggleLock, isLoading };
  }