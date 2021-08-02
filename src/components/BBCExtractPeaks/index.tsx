import React, { Fragment } from 'react';
import { useAsync } from 'react-async-hook';
import WaveformData from 'waveform-data';

const EMPTY_PEAKS = {
  version: 2,
  channels: 1,
  sample_rate: 48000,
  samples_per_pixel: 256,
  bits: 8,
  length: 0,
  data: [],
};

const fetchPeaks = async (dataUri: string, type: 'dat' | 'json') => {
  const parsePeaksMethod = type === 'dat' ? 'arrayBuffer' : 'json';
  const peaksResponse = await fetch(dataUri);
  try {
    const decodedPeaks = await peaksResponse[parsePeaksMethod]();
    return decodedPeaks;
  } catch (e) {
    return EMPTY_PEAKS;
  }
};

const RemoteFetch = ({
  location,
  type,
  children,
}: {
  location: string;
  type: 'dat' | 'json';
  children: (data: WaveformData) => JSX.Element;
}) => {
  const asyncPeaks = useAsync(fetchPeaks, [location, type]);

  return (
    <Fragment>
      {asyncPeaks.loading && <div>Loading</div>}
      {asyncPeaks.error && <div>Error loading peaks</div>}
      {asyncPeaks.result && children(WaveformData.create(asyncPeaks.result))}
    </Fragment>
  );
};

type Props = {
  location: string;
  type: 'json' | 'dat';
  children: (data: WaveformData) => JSX.Element;
};

export const BBCWaveformData = ({ children, ...props }: Props) => {
  return (
    <RemoteFetch {...props}>
      {waveformData => children(waveformData)}
    </RemoteFetch>
  );
};
