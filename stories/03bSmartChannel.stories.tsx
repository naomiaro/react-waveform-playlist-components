import React from 'react';
import { SmartChannel, SmartChannelProps } from '../src/components/Channel';
import BBCWaveformData from '../media/json/vocals.json';
import { Bits } from 'webaudio-peaks';

export default {
  title: 'SmartChannel',
  component: SmartChannel,
};

export const Default = (args: SmartChannelProps) => (
  <SmartChannel
    {...args}
    data={new Int16Array(BBCWaveformData.data)}
    bits={BBCWaveformData.bits as Bits}
    length={BBCWaveformData.length}
    index={0}
  />
);

Default.args = {};
