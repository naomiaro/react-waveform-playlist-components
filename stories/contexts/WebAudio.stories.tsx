import React from 'react';
import { WebAudioProvider } from '../../src/contexts/WebAudio';
import { StyledChannel } from '../../src/components/Channel/Channel';

export default {
  title: 'WebAudio',
};

export const Default = () => (
  <WebAudioProvider
    samplesPerPixel={1000}
    bits={16}
    source={'/audio/Vocals30.mp3'}
  >
    <StyledChannel index={0} />
  </WebAudioProvider>
);
