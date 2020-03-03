import React from 'react';
import { StyledChannel } from '../src/components/Channel/Channel';
import BBCWaveformData from '../media/json/vocals.json';

export default {
  title: 'Channel',
  component: StyledChannel,
};

export const Default = () => (
  <StyledChannel
    data={new Int16Array(BBCWaveformData.data)}
    bits={BBCWaveformData.bits as Bits}
    length={BBCWaveformData.length}
    index={0}
  />
);
