import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';

const base = {
  waveOutlineColor: 'white',
  waveFillColor: 'green',
  waveProgressColor: 'orange',
  waveHeight: 80,
  timeColor: 'grey',
  timeScaleHeight: 10,
  controlWidth: 0,
};

const themes = [Object.assign({}, base, { name: 'Base' })];
addDecorator(withThemesProvider(themes));
