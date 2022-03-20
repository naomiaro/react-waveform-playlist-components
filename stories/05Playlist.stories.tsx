import React from 'react';
import withMock from 'storybook-addon-mock';
import { StyledPlaylist, SmartTrack, SmartScale } from '../src/components';
import { PlaylistInfoContext, TrackControlsContext } from '../src/contexts';
import { BBC_DATA_REQUESTS } from './utils/requests';

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
  decorators: [withMock],
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
    <SmartTrack dataUri="json/vocals_mono_8bit.json" type="json" />
  </StyledPlaylist>
);

Default.parameters = {
  mockData: BBC_DATA_REQUESTS,
};

export const MultipleChannels = () => (
  <StyledPlaylist>
    <SmartTrack dataUri="json/vocals_multi_8bit.json" type="json" />
  </StyledPlaylist>
);

MultipleChannels.parameters = {
  mockData: BBC_DATA_REQUESTS,
};

export const TimeScale = () => (
  <StyledPlaylist>
    <SmartScale />
    <SmartTrack dataUri="json/vocals_mono_8bit.json" type="json" />
  </StyledPlaylist>
);

TimeScale.parameters = {
  mockData: BBC_DATA_REQUESTS,
};

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
        <SmartTrack dataUri="json/vocals_mono_8bit.json" type="json" />
      </StyledPlaylist>
    </TrackControlsContext.Provider>
  </PlaylistInfoContext.Provider>
);

TimeScaleAndControls.parameters = {
  mockData: BBC_DATA_REQUESTS,
};

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
        <SmartTrack dataUri="json/vocals_multi_8bit.json" type="json" />
      </StyledPlaylist>
    </TrackControlsContext.Provider>
  </PlaylistInfoContext.Provider>
);

TimeScaleAndControlsMultipleChannels.parameters = {
  mockData: BBC_DATA_REQUESTS,
};

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
        <SmartTrack dataUri="json/vocals_mono_8bit.json" type="json" />
      </TrackControlsContext.Provider>
      <TrackControlsContext.Provider value={makeControls('Vocals2')}>
        <SmartTrack dataUri="json/vocals_mono_8bit.json" type="json" />
      </TrackControlsContext.Provider>
    </StyledPlaylist>
  </PlaylistInfoContext.Provider>
);

TimeScaleAndControlsMultipleTracks.parameters = {
  mockData: BBC_DATA_REQUESTS,
};

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
        <SmartTrack dataUri="json/vocals_multi_8bit.json" type="json" />
      </TrackControlsContext.Provider>
      <TrackControlsContext.Provider value={makeControls('Vocals 2')}>
        <SmartTrack dataUri="json/vocals_multi_8bit.json" type="json" />
      </TrackControlsContext.Provider>
    </StyledPlaylist>
  </PlaylistInfoContext.Provider>
);

TimeScaleAndControlsMultipleTracksWithMultipleChannels.parameters = {
  mockData: BBC_DATA_REQUESTS,
};
