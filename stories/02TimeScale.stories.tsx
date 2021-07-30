import React from 'react';
import { StyledTimeScale, TimeScaleProps } from '../src/components/TimeScale';

export default {
  title: 'Timescale',
  component: StyledTimeScale,
};

export const Default = (args: TimeScaleProps) => <StyledTimeScale {...args} />;

Default.args = {
  marker: 2000,
  bigStep: 1000,
  secondStep: 500,
  duration: 30000,
};
