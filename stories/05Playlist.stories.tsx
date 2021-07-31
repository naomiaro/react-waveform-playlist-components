import React from 'react';
import { StyledPlaylist } from '../src/components/Playlist';
import { StyledChannel } from '../src/components/Channel/Channel';
import { StyledTrack } from '../src/components/Track';
import { SmartScale } from '../src/components/TimeScale';
import BBCWaveformData from '../media/json/vocals.json';
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

export const TimeScale = () => (
  <StyledPlaylist>
    <SmartScale />
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
      <StyledTrack numChannels={1} controls={makeControls('Track 1')}>
        <StyledChannel
          data={new Int16Array(BBCWaveformData.data)}
          bits={BBCWaveformData.bits as Bits}
          length={BBCWaveformData.length}
          index={0}
        />
      </StyledTrack>
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
      <StyledTrack numChannels={2} controls={makeControls('Track 1')}>
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
      <StyledTrack numChannels={1} controls={makeControls('Track 1')}>
        <StyledChannel
          data={new Int16Array(BBCWaveformData.data)}
          bits={BBCWaveformData.bits as Bits}
          length={BBCWaveformData.length}
          index={0}
        />
      </StyledTrack>
      <StyledTrack numChannels={1} controls={makeControls('Track 2')}>
        <StyledChannel
          data={new Int16Array(BBCWaveformData.data)}
          bits={BBCWaveformData.bits as Bits}
          length={BBCWaveformData.length}
          index={0}
        />
      </StyledTrack>
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
      <StyledTrack numChannels={2} controls={makeControls('Track 1')}>
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
      <StyledTrack numChannels={2} controls={makeControls('Track 2')}>
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
  </PlaylistInfoContext.Provider>
);
