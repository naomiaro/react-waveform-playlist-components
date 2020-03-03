import React, { Fragment } from 'react';
import extractPeaks from 'webaudio-peaks';

type Props = {
  children: (peaks: number[][], bits: number, length: number) => JSX.Element[];
  samplesPerPixel: number;
  bits: number;
  source: AudioBuffer;
  showMultiChannel: boolean;
};

export const ExtractPeacksProvider = ({
  children,
  source,
  bits = 16,
  samplesPerPixel,
  showMultiChannel = false,
}: Props) => {
  const peaks = extractPeaks(
    source,
    samplesPerPixel,
    !showMultiChannel,
    0,
    source.length,
    bits
  );

  return <Fragment>{children(peaks.data, peaks.bits, peaks.length)}}</Fragment>;
};
