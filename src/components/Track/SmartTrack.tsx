import React, { Fragment, FunctionComponent, ReactNode } from 'react';
import { SmartChannel } from '../Channel';
import { Track } from './Track';
import WaveformData from 'waveform-data';
import { useWaveformData } from '../BBCExtractPeaks';

export interface SmartTrackProps {
  dataUri: string;
  type: 'dat' | 'json';
  controls?: ReactNode;
}

function parseData(waveform: WaveformData, channel: number) {
  const peakLength = waveform.length;
  let data;

  if (waveform.bits === 8) {
    data = new Int8Array(peakLength * 2);
  } else {
    data = new Int16Array(peakLength * 2);
  }
  for (let i = 0; i < peakLength; i++) {
    data[i * 2] = waveform.channel(channel).min_sample(i);
    data[i * 2 + 1] = waveform.channel(channel).max_sample(i);
  }

  return data;
}

export const SmartTrack: FunctionComponent<SmartTrackProps> = ({
  dataUri,
  type,
  controls,
}) => {
  const { data: waveform } = useWaveformData(dataUri, type);

  return (
    <Fragment>
      {!waveform && <Track numChannels={0} />}
      {waveform && (
        <Track numChannels={waveform.channels} controls={controls}>
          {Array(waveform.channels)
            .fill(0)
            .map((_, i) => {
              return (
                <SmartChannel
                  data={parseData(waveform, i)}
                  bits={waveform.bits as 8 | 16}
                  length={waveform.length}
                  index={i}
                  key={i}
                />
              );
            })}
        </Track>
      )}
    </Fragment>
  );
};
