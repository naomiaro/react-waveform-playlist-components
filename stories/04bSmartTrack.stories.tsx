import React from 'react';
import { PlaylistInfoContext } from '../src/contexts/PlaylistInfo';
import {
  SmartTrack,
  SmartTrackProps,
} from '../src/components/Track/SmartTrack';

export default {
  title: 'SmartTrack',
  component: SmartTrack,
};

const args = {
  dataUri: 'dat/vocals_mono_8bit.dat',
  type: 'dat',
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

export const WithZoom = (args: SmartTrackProps) => (
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
    <SmartTrack {...args}></SmartTrack>
  </PlaylistInfoContext.Provider>
);

WithZoom.args = args;
WithZoom.argTypes = argTypes;
