import React from "react";

import { fetchChannels, fetchEpg } from "./helpers";

import { Channel, Program, useEpg } from "planby";

import { theme } from "./helpers/theme";

export function useApp() {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [epg, setEpg] = React.useState<Program[]>([]);
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

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(true);
    const epg = await fetchEpg();
    const channels = await fetchChannels();
    setEpg(epg as Program[]);
    setChannels(channels as Channel[]);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return { getEpgProps, getLayoutProps, isLoading };
}
