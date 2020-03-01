import React, { useState, createContext, useContext, ReactNode } from 'react';

const defaultScale = window.devicePixelRatio;
let mqString = `(resolution: ${defaultScale}dppx)`;

export const DevicePixelRatioContext = createContext(defaultScale);

type Props = {
  children: ReactNode;
};
export const DevicePixelRatioProvider = ({ children }: Props) => {
  const [scale, setScale] = useState(defaultScale);
  const updatePixelRatio = () => {
    setScale(window.devicePixelRatio);
  };
  matchMedia(mqString).addListener(updatePixelRatio);

  return (
    <DevicePixelRatioContext.Provider value={scale}>
      {children}
    </DevicePixelRatioContext.Provider>
  );
};

export const useDevicePixelRatio = () => useContext(DevicePixelRatioContext);
