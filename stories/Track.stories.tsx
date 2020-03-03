import React from 'react';
import { StyledChannel } from '../src/components/Channel/Channel';
import { StyledTrack } from '../src/components/Track';
import BBCWaveformData from '../media/json/vocals.json';

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
  title: 'Styled Track',
  component: StyledTrack,
};

export const Default = () => (
  <StyledTrack
    numChannels={1}
    controls={
      <Controls>
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
    }
  >
    <StyledChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as Bits}
      length={BBCWaveformData.length}
      index={0}
    />
  </StyledTrack>
);

export const MultipleChannels = () => (
  <StyledTrack
    numChannels={1}
    controls={
      <Controls>
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
    }
  >
    <StyledChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as Bits}
      length={BBCWaveformData.length}
      index={0}
    />
    <StyledChannel
      data={new Int16Array(BBCWaveformData.data)}
      bits={BBCWaveformData.bits as Bits}
      length={BBCWaveformData.length}
      index={1}
    />
  </StyledTrack>
);
