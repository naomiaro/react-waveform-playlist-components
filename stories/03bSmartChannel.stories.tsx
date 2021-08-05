import React from 'react';
import { SmartChannel } from '../src/components/Channel';
import BBCWaveformData from '../media/json/vocals_mono_8bit.json';

export default {
  title: 'SmartChannel',
  component: SmartChannel,
};

export const Default = () => (
  <SmartChannel
    data={new Int16Array(BBCWaveformData.data)}
    bits={BBCWaveformData.bits as 8 | 16}
    length={BBCWaveformData.length}
    index={0}
  />
);
