import React, { ReactNode } from 'react';
import extractPeaks from 'webaudio-peaks';
import { PeaksProvider } from './Peaks';

type Props = {
  children?: ReactNode;
  samplesPerPixel: number;
  bits: number;
  source: AudioBuffer;
};

export const ExtractPeacksProvider = ({
  children,
  source,
  bits,
  samplesPerPixel,
}: Props) => {
  const peaks = extractPeaks(
    source,
    samplesPerPixel,
    true,
    0,
    source.length,
    bits
  );

  return (
    <PeaksProvider
      data={peaks.data[0]} //TODO work with multiple channels
      bits={bits}
      sampleRate={source.sampleRate}
      samplesPerPixel={samplesPerPixel}
      length={peaks.length}
    >
      {children}
    </PeaksProvider>
  );
};
