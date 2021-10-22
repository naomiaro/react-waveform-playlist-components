import React from 'react';
import { Channel, ChannelProps } from '../src/components';
import BBCWaveformData from '../media/json/vocals_mono_8bit.json';
import { Bits } from 'webaudio-peaks';

export default {
  title: 'Channel',
  component: Channel,
};

export const Default = (args: ChannelProps) => (
  <Channel
    {...args}
    data={new Int16Array(BBCWaveformData.data)}
    bits={BBCWaveformData.bits as Bits}
    length={BBCWaveformData.length}
    index={0}
  />
);

Default.args = {
  progress: 0,
  devicePixelRatio: 1,
  waveHeight: 80,
  waveProgressColor: 'orange',
  waveOutlineColor: '#E0EFF1',
  waveFillColor: 'grey',
};
