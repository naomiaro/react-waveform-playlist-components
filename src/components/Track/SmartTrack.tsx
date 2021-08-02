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
  const data = [];
  for (let i = 0; i < waveform.length; i++) {
    data.push(waveform.channel(channel).min_sample(i));
    data.push(waveform.channel(channel).max_sample(i));
  }

  if (waveform.bits === 8) {
    return new Int8Array(data);
  } else {
    return new Int16Array(data);
  }
}

export const SmartTrack: FunctionComponent<SmartTrackProps> = ({
  dataUri,
  type,
  controls,
}) => {
  const { loading, error, data: waveform } = useWaveformData(dataUri, type);

  return (
    <Fragment>
      {!waveform && 'test'}
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
