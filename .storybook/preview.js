import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DevicePixelRatioProvider } from '../src/contexts/DevicePixelRatio';

const theme = {
  waveOutlineColor: '#E0EFF1',
  waveFillColor: 'grey',
  waveProgressColor: 'orange',
  timeColor: 'grey',
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
  (Story) => (
    <DevicePixelRatioProvider>
      <Story />
    </DevicePixelRatioProvider>
  ),
];
