import React from "react";

import { fetchChannels, fetchEpg } from "./helpers";

import { Channel, Program, useEpg } from "planby";

import { theme } from "./helpers/theme";
import useLocalStorage from "./helpers/useLocalStorage";
import { LocalStorage_Friends, LocalStorage_Me, Person } from "./types/types";
import { convertProgramToClass } from "./utils/transform";
import { programsToClasses } from "./utils/data";
import {
  default_LocalStorage_Friends,
  default_LocalStorage_Me,
} from "./defaults/default";
import { LOCALSTORAGE_KEY_FRIENDS } from "./constants/constants";

export function useApp(epgList: Program[]) {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [epg, setEpg] = React.useState<Program[]>(epgList);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [person, setPerson] = useLocalStorage<LocalStorage_Me>(
    "me",
    default_LocalStorage_Me
  );
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

  const toggleLock = (programId, peopleId) => {
    setEpg((prevEpg) =>
      prevEpg.map((program) =>
        program.id === programId
          ? { ...program, locked: !program.locked }
          : program
      )
    );
  };

  React.useEffect(() => {
    setPerson((prevFriend) => {
      if (prevFriend) {
        const updatedFriend = {
          ...prevFriend,
          classes: programsToClasses(epg),
        };
        return updatedFriend;
      }
      return prevFriend;
    });
  }, [epg]);
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

  const [friends, setFriends] = useLocalStorage<LocalStorage_Friends>(
    LOCALSTORAGE_KEY_FRIENDS,
    default_LocalStorage_Friends
  );
  const findFriendByName = (friendName: string) => {
    return friends.find((friend) => friend.name === friendName);
  };
  const [friend, setFriend] = React.useState<Person | undefined>(
    findFriendByName(personName)
  );
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
      const updatedEpg = prevEpg.map((program) =>
        program.id === programId
          ? { ...program, locked: !program.locked }
          : program
      );
      setClasses(programsToClasses(updatedEpg));
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
