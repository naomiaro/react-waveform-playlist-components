import React from 'react';
import { withKnobs, select, boolean, number } from '@storybook/addon-knobs';
import { WebAudioProvider } from '../src/contexts/WebAudio';
import { StyledChannel } from '../src/components/Channel/Channel';
import { StyledTrack } from '../src/components/Track';
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
  title: 'WebAudio',
  decorators: [withKnobs],
};

export const Default = () => (
  <WebAudioProvider source={'/audio/Vocals30.mp3'}>
    {(peaks, bits, length) => (
      <StyledTrack numChannels={peaks.length} controls={null}>
        {peaks.map((data, index) => (
          <StyledChannel
            key={index}
            index={index}
            data={data}
            bits={bits}
            length={length}
          />
        ))}
      </StyledTrack>
    )}
  </WebAudioProvider>
);

export const MultiChannel = () => (
  <WebAudioProvider source={'/audio/Vocals30.mp3'} showMultiChannel={true}>
    {(peaks, bits, length) => (
      <StyledTrack numChannels={peaks.length} controls={null}>
        {peaks.map((data, index) => (
          <StyledChannel
            key={index}
            index={index}
            data={data}
            bits={bits}
            length={length}
          />
        ))}
      </StyledTrack>
    )}
  </WebAudioProvider>
);

export const WithControls = () => (
  <WebAudioProvider source={'/audio/Vocals30.mp3'} showMultiChannel={true}>
    {(peaks, bits, length) => (
      <StyledTrack
        numChannels={peaks.length}
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
        {peaks.map((data, index) => (
          <StyledChannel
            key={index}
            index={index}
            data={data}
            bits={bits}
            length={length}
          />
        ))}
      </StyledTrack>
    )}
  </WebAudioProvider>
);

export const WithKnobs = () => (
  <WebAudioProvider
    source={select(
      'source',
      {
        '/audio/Vocals30.mp3': '/audio/Vocals30.mp3',
        '/audio/Guitar30.mp3': '/audio/Guitar30.mp3',
        '/audio/PianoSynth30.mp3': '/audio/PianoSynth30.mp3',
        '/audio/BassDrums30.mp3': '/audio/BassDrums30.mp3',
      },
      '/audio/Vocals30.mp3'
    )}
    showMultiChannel={boolean('showMultiChannel', false)}
    bits={select('bits', { 8: 8, 16: 16, 32: 32 }, 16)}
    samplesPerPixel={number('samplesPerPixel', 1000, {
      range: true,
      min: 50,
      max: 5000,
      step: 1,
    })}
  >
    {(peaks, bits, length) => (
      <StyledTrack numChannels={peaks.length} controls={null}>
        {peaks.map((data, index) => (
          <StyledChannel
            key={index}
            index={index}
            data={data}
            bits={bits}
            length={length}
          />
        ))}
      </StyledTrack>
    )}
  </WebAudioProvider>
);
