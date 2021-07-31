import React, { useState, createContext, useContext, ReactNode } from 'react';

const defaultProgress = 0;
const defaultIsPlaying = false;

const defaultPlayout = {
  progress: defaultProgress,
  isPlaying: defaultIsPlaying,
};

export const PlayoutContext = createContext(defaultPlayout);

type Props = {
  children: ReactNode;
};
export const PlayoutProvider = ({ children }: Props) => {
  const [isPlaying] = useState(defaultIsPlaying);
  const [progress] = useState(defaultProgress);

  return (
    <PlayoutContext.Provider value={{ isPlaying, progress }}>
      {children}
    </PlayoutContext.Provider>
  );
};

export const usePlayoutStatus = () => useContext(PlayoutContext);
