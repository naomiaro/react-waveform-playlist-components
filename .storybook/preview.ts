import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { DevicePixelRatioDecorator } from './decorators/devicePixelRatioDecorator';

const base = {
  waveOutlineColor: 'black',
  waveFillColor: 'green',
  waveProgressColor: 'orange',
  waveHeight: 100,
  timeColor: 'grey',
  timeScaleHeight: 15,
  controlWidth: 200,
};

const reverse = {
  waveOutlineColor: 'green',
  waveFillColor: 'black',
  waveProgressColor: 'orange',
  waveHeight: 80,
  timeColor: 'grey',
  timeScaleHeight: 15,
  controlWidth: 0,
};

const themes = [
  Object.assign({}, reverse, { name: 'Reverse' }),
  Object.assign({}, base, { name: 'Base' }),
];
addDecorator(withThemesProvider(themes, ThemeProvider));
addDecorator(DevicePixelRatioDecorator);
