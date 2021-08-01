import React, { FunctionComponent } from 'react';
import { Peaks, Bits } from 'webaudio-peaks';
import { useDevicePixelRatio, usePlaylistInfo, useTheme } from '../../contexts';
import { Channel } from './Channel';

export interface SmartChannelProps {
  className?: string;
  index: number;
  data: Peaks;
  bits: Bits;
  length: number;
}

export const SmartChannel: FunctionComponent<SmartChannelProps> = props => {
  const theme = useTheme();
  const { waveHeight } = usePlaylistInfo();
  const devicePixelRatio = useDevicePixelRatio();

  return (
    <Channel
      {...props}
      {...theme}
      waveHeight={waveHeight}
      devicePixelRatio={devicePixelRatio}
    ></Channel>
  );
};
