import React from 'react';
import { StyledPlaylist, SmartTrack, SmartScale } from '../src/components';
import { PlaylistInfoContext, TrackControlsContext } from '../src/contexts';

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
  title: 'Playlist',
  component: StyledPlaylist,
};

function makeControls(trackName: string) {
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
      zoomLevels: [1000, 1500, 2000, 2500],
      waveHeight: 100,
      timeScaleHeight: 15,
      controls: {
        show: true,
        width: 200,
      },
      duration: 30000,
    }}
  >
    <TrackControlsContext.Provider value={makeControls('Track 1')}>
      <StyledPlaylist>
        <SmartScale />
        <SmartTrack dataUri="dat/vocals_mono_8bit.dat" type="dat" />
      </StyledPlaylist>
    </TrackControlsContext.Provider>
  </PlaylistInfoContext.Provider>
);

export const TimeScaleAndControlsMultipleChannels = () => (
  <PlaylistInfoContext.Provider
    value={{
      sampleRate: 48000,
      samplesPerPixel: 1000,
      zoomLevels: [1000, 1500, 2000, 2500],
      waveHeight: 80,
      timeScaleHeight: 15,
      controls: {
        show: true,
        width: 200,
      },
      duration: 30000,
    }}
  >
    <TrackControlsContext.Provider value={makeControls('Track 1')}>
      <StyledPlaylist>
        <SmartScale />
        <SmartTrack dataUri="dat/vocals_multi_8bit.dat" type="dat" />
      </StyledPlaylist>
    </TrackControlsContext.Provider>
  </PlaylistInfoContext.Provider>
);

export const TimeScaleAndControlsMultipleTracks = () => (
  <PlaylistInfoContext.Provider
    value={{
      sampleRate: 48000,
      samplesPerPixel: 1000,
      zoomLevels: [1000, 1500, 2000, 2500],
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
      <TrackControlsContext.Provider value={makeControls('Vocals 1')}>
        <SmartTrack dataUri="dat/vocals_mono_8bit.dat" type="dat" />
      </TrackControlsContext.Provider>
      <TrackControlsContext.Provider value={makeControls('Vocals2')}>
        <SmartTrack dataUri="dat/vocals_mono_8bit.dat" type="dat" />
      </TrackControlsContext.Provider>
    </StyledPlaylist>
  </PlaylistInfoContext.Provider>
);

export const TimeScaleAndControlsMultipleTracksWithMultipleChannels = () => (
  <PlaylistInfoContext.Provider
    value={{
      sampleRate: 48000,
      samplesPerPixel: 1000,
      zoomLevels: [1000, 1500, 2000, 2500],
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
      <TrackControlsContext.Provider value={makeControls('Vocals 1')}>
        <SmartTrack dataUri="dat/vocals_multi_8bit.dat" type="dat" />
      </TrackControlsContext.Provider>
      <TrackControlsContext.Provider value={makeControls('Vocals 2')}>
        <SmartTrack dataUri="dat/vocals_multi_8bit.dat" type="dat" />
      </TrackControlsContext.Provider>
    </StyledPlaylist>
  </PlaylistInfoContext.Provider>
);
