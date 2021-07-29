import React from 'react';
import { StyledChannel, ChannelProps } from '../src/components/Channel/Channel';
import BBCWaveformData from '../media/json/vocals.json';

export default {
  title: 'Styled Channel',
  component: StyledChannel,
};

export const Default = (args: ChannelProps) => (
  <StyledChannel
    {...args}
    data={new Int16Array(BBCWaveformData.data)}
    bits={BBCWaveformData.bits as Bits}
    length={BBCWaveformData.length}
    index={0}
  />
);

Default.args = {
  progress: 0,
};
