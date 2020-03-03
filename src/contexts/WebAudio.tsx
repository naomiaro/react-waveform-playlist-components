import React, { ReactNode } from 'react';
import { useAsync } from 'react-async-hook';
import { ExtractPeacksProvider } from './ExtractPeaks';
import { load } from '../loading';

type AudioDataSource = string | Blob;
type Props = {
  children?: ReactNode;
  samplesPerPixel: number;
  bits: number;
  source: AudioDataSource;
};

const loadAudioData = async (source: AudioDataSource) => await load(source);

export const WebAudioProvider = ({
  children,
  source,
  bits,
  samplesPerPixel,
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
        >
          {children}
        </ExtractPeacksProvider>
      )}
    </div>
  );
};
