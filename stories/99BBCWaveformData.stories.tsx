import React from 'react';
import { BBCWaveformData } from '../src/components/BBCExtractPeaks';

export default {
  title: 'BBCWaveformData',
  component: BBCWaveformData,
};

export const Default = args => (
  <BBCWaveformData {...args}>
    {waveformData => {
      return (
        <code>
          <pre>{JSON.stringify(waveformData.toJSON(), null, 2)}</pre>
        </code>
      );
    }}
  </BBCWaveformData>
);

Default.args = {
  location: 'dat/vocals_mono_8bit.dat',
  type: 'dat',
};

Default.argTypes = {
  location: {
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
