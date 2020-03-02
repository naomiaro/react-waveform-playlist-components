import React from 'react';

import {
  Button,
  ButtonGroup,
  Controls,
  Header,
  VolumeDownIcon,
  VolumeUpIcon,
  VolumeSlider,
  VolumeSliderWrapper,
} from '../src/components/TrackControls';

export default {
  title: 'Track Controls',
};

export const Default = () => (
  <Controls controlWidth={200}>
    <Header>Track 1</Header>
    <ButtonGroup>
      <Button>Mute</Button>
      <Button>Solo</Button>
    </ButtonGroup>
    <VolumeSliderWrapper>
      <VolumeDownIcon />
      <VolumeSlider />
      <VolumeUpIcon />
    </VolumeSliderWrapper>
  </Controls>
);
