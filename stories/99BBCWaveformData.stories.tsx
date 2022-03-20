import React, { Fragment } from 'react';
import withMock from 'storybook-addon-mock';
import { BBCWaveformData, Props } from '../src/components';
import { BBC_DATA_REQUESTS } from './utils/requests';

export default {
  title: 'BBCWaveformData',
  component: BBCWaveformData,
  decorators: [withMock],
};

export const Default = (args: Props) => (
  <BBCWaveformData {...args}>
    {({ data, loading, error }) => {
      return (
        <Fragment>
          {loading && 'Loading WaveformData'}
          {error && error.message}
          {data && (
            <code>
              <pre>{JSON.stringify(data.toJSON(), null, 2)}</pre>
            </code>
          )}
        </Fragment>
      );
    }}
  </BBCWaveformData>
);

Default.args = {
  location: 'json/vocals_mono_8bit.json',
  type: 'json',
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

Default.parameters = {
  mockData: BBC_DATA_REQUESTS,
};
