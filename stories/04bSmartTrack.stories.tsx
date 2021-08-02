import React from 'react';
import {
  SmartTrack,
  SmartTrackProps,
} from '../src/components/Track/SmartTrack';

export default {
  title: 'SmartTrack',
  component: SmartTrack,
};

export const Default = (args: SmartTrackProps) => (
  <SmartTrack {...args}></SmartTrack>
);

Default.args = {
  dataUri: 'dat/vocals_mono_8bit.dat',
  type: 'dat',
};

Default.argTypes = {
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
