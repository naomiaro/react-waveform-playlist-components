import React from 'react';
import { Story } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { PlaylistInfoContext } from '../src/contexts';
import { SmartTrack, SmartTrackProps } from '../src/components';
import { BBC_DATA_REQUESTS } from './utils/requests';

export default {
  title: 'SmartTrack',
  component: SmartTrack,
  decorators: [withMock],
};

const args = {
  dataUri: 'json/vocals_mono_8bit.json',
  type: 'json',
};

const argTypes = {
  dataUri: {
    control: {
      type: 'select',
      options: {
        'dat/vocals_mono_8bit.dat': 'dat/vocals_mono_8bit.dat',
        'dat/vocals_mono_16bit.dat': 'dat/vocals_mono_16bit.dat',
        'dat/vocals_multi_8bit.dat': 'dat/vocals_multi_8bit.dat',
        'dat/vocals_multi_16bit.dat': 'dat/vocals_multi_16bit.dat',
        'json/vocals_mono_8bit.json': 'json/vocals_mono_8bit.json',
        'json/vocals_mono_16bit.json': 'json/vocals_mono_16bit.json',
        'json/vocals_multi_8bit.json': 'json/vocals_multi_8bit.json',
        'json/vocals_multi_16bit.json': 'json/vocals_multi_16bit.json',
      },
    },
  },
};

export const Default = (args: SmartTrackProps) => (
  <SmartTrack {...args}></SmartTrack>
);

Default.args = args;
Default.argTypes = argTypes;
Default.parameters = {
  mockData: BBC_DATA_REQUESTS,
};

export const WithZoom = (args: SmartTrackProps) => (
  <SmartTrack {...args}></SmartTrack>
);

WithZoom.args = args;
WithZoom.argTypes = argTypes;
WithZoom.decorators = [
  (Story: Story) => (
    <PlaylistInfoContext.Provider
      value={{
        sampleRate: 48000,
        samplesPerPixel: 2000,
        zoomLevels: [1000, 1500, 2000, 2500],
        waveHeight: 80,
        timeScaleHeight: 15,
        controls: {
          show: false,
          width: 200,
        },
        duration: 30000,
      }}
    >
      <Story />
    </PlaylistInfoContext.Provider>
  ),
];
WithZoom.parameters = {
  mockData: BBC_DATA_REQUESTS,
};
