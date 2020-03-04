import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';

const base = {
  waveOutlineColor: 'black',
  waveFillColor: 'green',
  waveProgressColor: 'orange',
  waveHeight: 80,
  timeColor: 'grey',
  timeScaleHeight: 30,
  controlWidth: 200,
};

const reverse = {
  waveOutlineColor: 'green',
  waveFillColor: 'black',
  waveProgressColor: 'orange',
  waveHeight: 80,
  timeColor: 'grey',
  timeScaleHeight: 30,
  controlWidth: 0,
};

const themes = [
  Object.assign({}, reverse, { name: 'Reverse' }),
  Object.assign({}, base, { name: 'Base' }),
];
addDecorator(withThemesProvider(themes));
