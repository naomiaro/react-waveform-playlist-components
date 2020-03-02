import React from 'react';
import { withContexts } from '@storybook/addon-contexts/react';
import { StyledChannel } from '../src/components/Channel/Channel';
import { PeaksProvider } from '../src/contexts/Peaks';
import BBCWaveformData from '../media/json/vocals.json';

const contexts = [
  {
    icon: 'box',
    title: 'Peaks',
    components: [PeaksProvider],
    params: [
      {
        name: 'BBC Vocals.json',
        props: {
          data: BBCWaveformData.data,
          bits: BBCWaveformData.bits,
          sampleRate: BBCWaveformData.sample_rate,
          samplesPerPixel: BBCWaveformData.samples_per_pixel,
          length: BBCWaveformData.length,
        },
        default: true,
      },
    ],
    options: {
      deep: true,
      disable: false,
      cancelable: false,
    },
  },
];

export default {
  title: 'Channel',
  component: StyledChannel,
  decorators: [withContexts(contexts)],
};

export const Default = () => <StyledChannel index={0} />;
