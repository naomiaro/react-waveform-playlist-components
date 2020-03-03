import React, { ReactNode, useEffect, useRef } from 'react';
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
  const peaksRef = useRef({ length: 0, data: [], bits });
  useEffect(() => {
    const peaks = extractPeaks(
      source,
      samplesPerPixel,
      true,
      0,
      source.length,
      bits
    );
    peaksRef.current = peaks;
  }, [source, samplesPerPixel, bits]);

  console.log(source);
  return (
    <PeaksProvider
      data={peaksRef.current.data[0]}
      bits={bits}
      sampleRate={source.sampleRate}
      samplesPerPixel={samplesPerPixel}
      length={peaksRef.current.length}
    >
      {children}
    </PeaksProvider>
  );
};
