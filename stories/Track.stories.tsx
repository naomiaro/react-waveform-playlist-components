import React from 'react';
import { StyledChannel } from '../src/components/Channel/Channel';
import { StyledTrack } from '../src/components/Track';
import BBCWaveformData from '../media/json/vocals.json';

export default {
  title: 'Styled Track',
  component: StyledTrack,
};

export const Default = () => (
  <StyledTrack numChannels={1}>
    <StyledChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as Bits}
      length={BBCWaveformData.length}
      index={0}
    />
  </StyledTrack>
);

export const MultipleChannels = () => (
  <StyledTrack numChannels={2}>
    <StyledChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as Bits}
      length={BBCWaveformData.length}
      index={0}
    />
    <StyledChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as Bits}
      length={BBCWaveformData.length}
      index={1}
    />
  </StyledTrack>
);
