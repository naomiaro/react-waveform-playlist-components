import { createContext } from 'react';

export const PlaylistInfoContext = createContext({
  sampleRate: 48000,
  samplesPerPixel: 1000,
  waveHeight: 80,
  timeScaleHeight: 15,
  controls: {
    show: false,
    width: 150,
  },
});
