import React, { useState, createContext, useContext, ReactNode } from 'react';

function getScale() {
  return window.devicePixelRatio;
}

function defaultState() {
  return Math.ceil(getScale());
}

const DevicePixelRatioContext = createContext(defaultState());

type Props = {
  children: ReactNode;
};
export const DevicePixelRatioProvider = ({ children }: Props) => {
  const [scale, setScale] = useState(defaultState());

  function updateDevicePixelRatio() {
    matchMedia(`(resolution: ${scale}dppx)`).addEventListener(
      'change',
      () => {
        setScale(defaultState());
        updateDevicePixelRatio();
      },
      { once: true }
    );
  }

  updateDevicePixelRatio();

  return (
    <DevicePixelRatioContext.Provider value={scale}>
      {children}
    </DevicePixelRatioContext.Provider>
  );
};

export const useDevicePixelRatio = () => useContext(DevicePixelRatioContext);
