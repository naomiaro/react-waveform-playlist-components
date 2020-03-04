import React from 'react';
import { StyledChannel } from '../src/components/Channel/Channel';
import BBCWaveformData from '../media/json/vocals.json';

export default {
  title: 'Styled Channel',
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

export const Retina = () => (
  <StyledChannel
    data={new Int16Array(BBCWaveformData.data)}
    bits={BBCWaveformData.bits as Bits}
    length={BBCWaveformData.length}
    index={0}
    devicePixelRatio={2}
  />
);

export const WithProgress = () => (
  <StyledChannel
    data={new Int16Array(BBCWaveformData.data)}
    bits={BBCWaveformData.bits as Bits}
    length={BBCWaveformData.length}
    index={0}
    progress={100}
  />
);
