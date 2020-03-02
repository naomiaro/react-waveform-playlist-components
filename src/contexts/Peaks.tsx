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
export const PeaksProvider = ({ children, ...props }: Props) => {
  const [settings] = useState(Object.assign({}, defaultSettings, props));
  //   React.useEffect(() => {
  //     // We'd get the theme from a web API / local storage in a real app
  //     // We've hardcoded the theme in our example
  //     const currentTheme = 'lightblue';
  //     setTheme(currentTheme);
  //   }, []);

  return (
    <PeaksContext.Provider value={settings}>{children}</PeaksContext.Provider>
  );
};

export const usePeaks = () => useContext(PeaksContext);
// export const PeaksProvider = PeaksContext.Provider;
