import { Channel, ChannelBox, ChannelLogo } from "planby";
import React from 'react'
// @ts-ignore
import Icon from '../assets/day.png';
import { Typography } from "@mui/material";

interface ChannelItemProps {
  channel: Channel;
}

export const DayItem = ({ channel }: ChannelItemProps) => {
  const numericToDayMap: Map<string, string> = new Map([
    ['0', 'Mon'],
    ['1', 'Tue'],
    ['2', 'Wed'],
    ['3', 'Thurs'],
    ['4', 'Fri'],
    ['5', 'Sat'],
  ]);
  const { position, logo } = channel;
  return (
    <ChannelBox style={{ display: 'flex', flexDirection: 'column' }} {...position}>
      <ChannelLogo
        src={Icon}
        alt="Logo"
        style={{ maxHeight: 30, maxWidth: 30 }}
      />
      <p style={{ fontSize: '0.6rem' }}>{numericToDayMap.get(channel.uuid)}</p>
    </ChannelBox>
  );
};
