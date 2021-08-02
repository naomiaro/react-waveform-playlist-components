import React from 'react';
import { StyledPlaylist } from '../src/components/Playlist';
import { SmartChannel } from '../src/components/Channel';
import { SmartTrack, SmartTrackProps } from '../src/components/Track';
import { SmartScale } from '../src/components/TimeScale';
import { PlaylistInfoContext } from '../src/contexts/PlaylistInfo';

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
import { Bits } from 'webaudio-peaks';

export default {
  title: 'Playlist',
  component: StyledPlaylist,
};

function makeControls(trackName) {
  return (
    <Controls>
      <Header>{trackName}</Header>
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
}

export const Default = () => (
  <StyledPlaylist>
    <SmartTrack dataUri="dat/vocals_mono_8bit.dat" type="dat" />
  </StyledPlaylist>
);

export const MultipleChannels = () => (
  <StyledPlaylist>
    <SmartTrack dataUri="dat/vocals_multi_8bit.dat" type="dat" />
  </StyledPlaylist>
);

export const TimeScale = () => (
  <StyledPlaylist>
    <SmartScale />
    <SmartTrack dataUri="dat/vocals_mono_8bit.dat" type="dat" />
  </StyledPlaylist>
);

export const TimeScaleAndControls = () => (
  <PlaylistInfoContext.Provider
    value={{
      sampleRate: 48000,
      samplesPerPixel: 1000,
      waveHeight: 100,
      timeScaleHeight: 15,
      controls: {
        show: true,
        width: 200,
      },
      duration: 30000,
    }}
  >
    <StyledPlaylist>
      <SmartScale />
      <SmartTrack
        dataUri="dat/vocals_mono_8bit.dat"
        type="dat"
        controls={makeControls('Track 1')}
      />
    </StyledPlaylist>
  </PlaylistInfoContext.Provider>
);

export const TimeScaleAndControlsMultipleChannels = () => (
  <PlaylistInfoContext.Provider
    value={{
      sampleRate: 48000,
      samplesPerPixel: 1000,
      waveHeight: 80,
      timeScaleHeight: 15,
      controls: {
        show: true,
        width: 200,
      },
      duration: 30000,
    }}
  >
    <StyledPlaylist>
      <SmartScale />
      <SmartTrack
        dataUri="dat/vocals_multi_8bit.dat"
        type="dat"
        controls={makeControls('Track 1')}
      />
    </StyledPlaylist>
  </PlaylistInfoContext.Provider>
);

export const TimeScaleAndControlsMultipleTracks = () => (
  <PlaylistInfoContext.Provider
    value={{
      sampleRate: 48000,
      samplesPerPixel: 1000,
      waveHeight: 100,
      timeScaleHeight: 15,
      controls: {
        show: true,
        width: 200,
      },
      duration: 30000,
    }}
  >
    <StyledPlaylist>
      <SmartScale />
      <SmartTrack
        dataUri="dat/vocals_mono_8bit.dat"
        type="dat"
        controls={makeControls('Vocals 1')}
      />
      <SmartTrack
        dataUri="dat/vocals_mono_8bit.dat"
        type="dat"
        controls={makeControls('Vocals 2')}
      />
    </StyledPlaylist>
  </PlaylistInfoContext.Provider>
);

export const TimeScaleAndControlsMultipleTracksWithMultipleChannels = () => (
  <PlaylistInfoContext.Provider
    value={{
      sampleRate: 48000,
      samplesPerPixel: 1000,
      waveHeight: 80,
      timeScaleHeight: 15,
      controls: {
        show: true,
        width: 200,
      },
      duration: 30000,
    }}
  >
    <StyledPlaylist>
      <SmartScale />
      <SmartTrack
        dataUri="dat/vocals_multi_8bit.dat"
        type="dat"
        controls={makeControls('Vocals 1')}
      />
      <SmartTrack
        dataUri="dat/vocals_multi_8bit.dat"
        type="dat"
        controls={makeControls('Vocals 2')}
      />
    </StyledPlaylist>
  </PlaylistInfoContext.Provider>
);
