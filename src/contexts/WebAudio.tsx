import React from 'react';
import { useAsync } from 'react-async-hook';
import { ExtractPeacksProvider } from './ExtractPeaks';
import { load } from '../loading';

type AudioDataSource = string | Blob;
type Props = {
  children: (peaks: Peaks[], bits: number, length: number) => JSX.Element[];
  samplesPerPixel?: number;
  bits?: number;
  showMultiChannel?: boolean;
  source: AudioDataSource;
};

const loadAudioData = async (source: AudioDataSource) => await load(source);

export const WebAudioProvider = ({
  children,
  source,
  bits = 16,
  samplesPerPixel = 1000,
  showMultiChannel = false,
}: Props) => {
  const asyncAudioData = useAsync(loadAudioData, [source]);
  return (
    <div>
      {asyncAudioData.loading && <div>Loading</div>}
      {asyncAudioData.error && <div>Error: {asyncAudioData.error.message}</div>}
      {asyncAudioData.result && (
        <ExtractPeacksProvider
          source={asyncAudioData.result}
          bits={bits}
          samplesPerPixel={samplesPerPixel}
          showMultiChannel={showMultiChannel}
        >
          {children}
        </ExtractPeacksProvider>
      )}
    </div>
  );
};
