import React, { useState, createContext, useContext, ReactNode } from 'react';

const defaultSettings = {
  peaks: [],
  bits: 0,
  samplesPerPixel: 1000,
  sampleRate: 48000,
  zoomLevels: [500, 1000, 3000, 5000],
  numChannels: 1,
};

export const WPContext = createContext(defaultSettings);

type Props = {
  children: ReactNode;
};
export const WPProvider = ({ children }: Props) => {
  const [settings] = useState(defaultSettings);

  //   React.useEffect(() => {
  //     // We'd get the theme from a web API / local storage in a real app
  //     // We've hardcoded the theme in our example
  //     const currentTheme = 'lightblue';
  //     setTheme(currentTheme);
  //   }, []);

  return <WPContext.Provider value={settings}>{children}</WPContext.Provider>;
};

export const useWPSettings = () => useContext(WPContext);
