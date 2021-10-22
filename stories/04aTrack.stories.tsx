import React from 'react';
import { SmartChannel, Track } from '../src/components';
import BBCWaveformData from '../media/json/vocals_mono_8bit.json';

export default {
  title: 'Track',
  component: Track,
};

export const Default = () => (
  <Track numChannels={1}>
    <SmartChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as 8 | 16}
      length={BBCWaveformData.length}
      index={0}
    />
  </Track>
);

export const MultipleChannels = () => (
  <Track numChannels={2}>
    <SmartChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as 8 | 16}
      length={BBCWaveformData.length}
      index={0}
    />
    <SmartChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as 8 | 16}
      length={BBCWaveformData.length}
      index={1}
    />
  </Track>
);
