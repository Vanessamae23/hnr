import { Channel, ChannelBox, ChannelLogo } from "planby";
import React from 'react'
// @ts-ignore
import Icon from '../assets/day.png';

interface ChannelItemProps {
  channel: Channel;
}

export const DayItem = ({ channel }: ChannelItemProps) => {
  const { position, logo } = channel;
  return (
    <ChannelBox {...position}>
      <ChannelLogo
        src={Icon}
        alt="Logo"
        style={{ maxHeight: 52, maxWidth: 52 }}
      />
    </ChannelBox>
  );
};
