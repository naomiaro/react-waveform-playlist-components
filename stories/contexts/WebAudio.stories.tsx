import React from 'react';
import { WebAudioProvider } from '../../src/contexts/WebAudio';
import { StyledChannel } from '../../src/components/Channel/Channel';

export default {
  title: 'WebAudio',
};

export const Default = () => (
  <WebAudioProvider source={'/audio/Vocals30.mp3'}>
    {(peaks, bits, length) =>
      peaks.map((data, index) => (
        <StyledChannel
          key={index}
          index={index}
          data={data}
          bits={bits}
          length={length}
        />
      ))
    }
  </WebAudioProvider>
);

export const MultiChannel = () => (
  <WebAudioProvider source={'/audio/Vocals30.mp3'} showMultiChannel={true}>
    {(peaks, bits, length) =>
      peaks.map((data, index) => (
        <StyledChannel
          key={index}
          index={index}
          data={data}
          bits={bits}
          length={length}
        />
      ))
    }
  </WebAudioProvider>
);
