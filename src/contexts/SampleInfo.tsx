import { createContext } from 'react';

export const SampleInfoContext = createContext({
  sampleRate: 48000,
  samplesPerPixel: 1000,
});
