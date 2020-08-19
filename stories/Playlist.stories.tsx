import React from 'react';
import { StyledPlaylist } from '../src/components/Playlist';
import { StyledChannel } from '../src/components/Channel/Channel';
import { StyledTrack } from '../src/components/Track';
import { StyledTimeScale } from '../src/components/TimeScale';
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
  title: 'Styled Playlist',
  component: StyledPlaylist,
};

export const Default = () => (
  <StyledPlaylist>
    <StyledTrack numChannels={1}>
      <StyledChannel
        data={new Int16Array(BBCWaveformData.data)}
        bits={BBCWaveformData.bits as Bits}
        length={BBCWaveformData.length}
        index={0}
      />
    </StyledTrack>
  </StyledPlaylist>
);

export const MultipleChannels = () => (
  <StyledPlaylist>
    <StyledTrack numChannels={2}>
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
  </StyledPlaylist>
);

export const WithTimeScale = () => (
  <StyledPlaylist>
    <StyledTimeScale
      marker={2000}
      bigStep={1000}
      secondStep={500}
      duration={30000}
    />
    <StyledTrack numChannels={1}>
      <StyledChannel
        data={new Int16Array(BBCWaveformData.data)}
        bits={BBCWaveformData.bits as Bits}
        length={BBCWaveformData.length}
        index={0}
      />
    </StyledTrack>
  </StyledPlaylist>
);

export const WithTimeScaleAndControls = () => (
  <StyledPlaylist>
    <StyledTimeScale
      marker={2000}
      bigStep={1000}
      secondStep={500}
      duration={30000}
    />
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
  </StyledPlaylist>
);

export const WithTimeScaleAndControlsMultipleChannels = () => (
  <StyledPlaylist>
    <StyledTimeScale
      marker={2000}
      bigStep={1000}
      secondStep={500}
      duration={30000}
    />
    <StyledTrack
      numChannels={2}
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
  </StyledPlaylist>
);

export const WithTimeScaleAndControlsMultipleTracks = () => (
  <StyledPlaylist>
    <StyledTimeScale
      marker={2000}
      bigStep={1000}
      secondStep={500}
      duration={30000}
    />
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
    <StyledTrack
      numChannels={1}
      controls={
        <Controls>
          <Header>Track 2</Header>
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
  </StyledPlaylist>
);

export const WithTimeScaleAndControlsMultipleTracksWithMultipleChannels = () => (
  <StyledPlaylist>
    <StyledTimeScale
      marker={2000}
      bigStep={1000}
      secondStep={500}
      duration={30000}
    />
    <StyledTrack
      numChannels={2}
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
    <StyledTrack
      numChannels={2}
      controls={
        <Controls>
          <Header>Track 2</Header>
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
  </StyledPlaylist>
);
