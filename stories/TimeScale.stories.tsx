import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { StyledTimeScale } from '../src/components/TimeScale';

export default {
  title: 'Styled Timescale',
  component: StyledTimeScale,
  decorators: [withKnobs],
};

export const Default = () => (
  <StyledTimeScale
    marker={number('marker', 2000)}
    bigStep={number('bigStep', 1000)}
    smallStep={number('smallStep', 500)}
    secondStep={number('secondStep', 500)}
    duration={number('duration', 30000)}
  />
);
