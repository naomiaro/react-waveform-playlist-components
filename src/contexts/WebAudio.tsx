import React, { ReactNode } from 'react';
import extractPeaks from 'webaudio-peaks';
import { PeaksProvider } from './Peaks';

type Props = {
  children: ReactNode;
};
export const WebAudioProvider = ({ children }: Props) => {
  return <PeaksProvider>{children}</PeaksProvider>;
};
