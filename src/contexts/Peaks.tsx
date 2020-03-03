import React, { useState, createContext, useContext, ReactNode } from 'react';

const defaultSettings = {
  data: [],
  bits: 0,
  sampleRate: 48000,
  samplesPerPixel: 1000,
  length: 0,
};

export const PeaksContext = createContext(defaultSettings);

type Props = {
  children: ReactNode;
  data: Number[];
  bits: number;
  sampleRate: number;
  samplesPerPixel: number;
  length: number;
};
export const PeaksProvider = ({ children, ...props }: Partial<Props>) => {
  const [settings] = useState(Object.assign({}, defaultSettings, props));
  console.log(props);

  return (
    <PeaksContext.Provider value={settings}>{children}</PeaksContext.Provider>
  );
};

export const usePeaks = () => useContext(PeaksContext);
