import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { DevicePixelRatioProvider } from '../src/contexts/DevicePixelRatio';

const base = {
  waveOutlineColor: 'black',
  waveFillColor: 'green',
  waveProgressColor: 'orange',
  timeColor: 'grey',
};

const reverse = {
  waveOutlineColor: '#E0EFF1',
  waveFillColor: 'grey',
  waveProgressColor: 'orange',
  timeColor: 'grey',
};

const themes = [
  Object.assign({}, reverse, { name: 'Reverse' }),
  Object.assign({}, base, { name: 'Base' }),
];
addDecorator(withThemesProvider(themes, ThemeProvider));

export const decorators = [
  (Story) => (
    <DevicePixelRatioProvider>
      <Story />
    </DevicePixelRatioProvider>
  ),
];
