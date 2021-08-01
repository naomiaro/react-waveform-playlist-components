import React from 'react';
import { useAsync } from 'react-async-hook';
import { ExtractPeacksProvider } from './ExtractPeaks';
import { load } from '../loading';
import { Peaks, Bits } from 'webaudio-peaks';

type AudioDataSource = string | Blob;

export type WebAudioProviderProps = {
  children: (peaks: Peaks[], bits: Bits, length: number) => JSX.Element;
  samplesPerPixel?: number;
  bits?: Bits;
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
}: WebAudioProviderProps) => {
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