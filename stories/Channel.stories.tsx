import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { StyledChannel } from '../src/components/Channel/Channel';
import BBCWaveformData from '../media/json/vocals.json';

export default {
  title: 'Styled Channel',
  component: StyledChannel,
  decorators: [withKnobs],
};

export const Default = () => (
  <StyledChannel
    data={new Int16Array(BBCWaveformData.data)}
    bits={BBCWaveformData.bits as Bits}
    length={BBCWaveformData.length}
    index={0}
    progress={number('progress', 0)}
  />
);
