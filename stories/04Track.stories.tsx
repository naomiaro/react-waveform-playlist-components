import React from 'react';
import { SmartChannel } from '../src/components/Channel';
import { StyledTrack } from '../src/components/Track';
import BBCWaveformData from '../media/json/vocals_mono_8bit.json';
import { Bits } from 'webaudio-peaks';

export default {
  title: 'Track',
  component: StyledTrack,
};

export const Default = () => (
  <StyledTrack numChannels={1}>
    <SmartChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as Bits}
      length={BBCWaveformData.length}
      index={0}
    />
  </StyledTrack>
);

export const MultipleChannels = () => (
  <StyledTrack numChannels={2}>
    <SmartChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as Bits}
      length={BBCWaveformData.length}
      index={0}
    />
    <SmartChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as Bits}
      length={BBCWaveformData.length}
      index={1}
    />
  </StyledTrack>
);
