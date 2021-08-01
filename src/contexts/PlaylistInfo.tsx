import { createContext, useContext } from 'react';

export const PlaylistInfoContext = createContext({
  sampleRate: 48000,
  samplesPerPixel: 1000,
  waveHeight: 80,
  timeScaleHeight: 15,
  controls: {
    show: false,
    width: 150,
  },
  duration: 30000,
});

export const usePlaylistInfo = () => useContext(PlaylistInfoContext);