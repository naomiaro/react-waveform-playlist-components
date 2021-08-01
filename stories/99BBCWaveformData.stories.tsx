import React from 'react';
import { BBCWaveformData } from '../src/components/BBCExtractPeaks';

export default {
  title: 'BBCWaveformData',
  component: BBCWaveformData,
};

export const Default = args => (
  <BBCWaveformData {...args}>
    {waveformData => (
      <code>
        <pre>{JSON.stringify(waveformData.toJSON(), null, 2)}</pre>
      </code>
    )}
  </BBCWaveformData>
);

Default.args = {
  location: 'dat/vocals_mono.dat',
  type: 'dat',
};

Default.argTypes = {
  location: {
    control: {
      type: 'select',
      options: {
        'dat/vocals_mono.dat': 'dat/vocals_mono.dat',
        'dat/vocals_multi.dat': 'dat/vocals_multi.dat',
        'json/vocals_mono.json': 'json/vocals_mono.json',
        'json/vocals_multi.json': 'json/vocals_multi.json',
      },
    },
  },
};
