import React from 'react';

import { WebAudioProvider } from '../../src/contexts/WebAudio';

export default {
  title: 'WebAudio',
};

export const Default = () => (
  <WebAudioProvider
    samplesPerPixel={1000}
    bits={16}
    source={'/audio/Vocals30.mp3'}
  ></WebAudioProvider>
);
