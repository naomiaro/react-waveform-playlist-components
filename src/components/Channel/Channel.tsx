import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { withTheme, ThemeContext } from 'styled-components';
import { Progress } from './Progress';
import { Wrapper } from './Wrapper';
import { Waveform } from './Waveform';
import { useDevicePixelRatio } from 'contexts/DevicePixelRatio';
import { useWPSettings } from 'contexts/Waveform';
import { usePlayoutStatus } from 'contexts/Playout';

const MAX_CANVAS_WIDTH = 1000;

export interface ChannelProps {
  className?: string;
  index?: number;
}

export const Channel: FunctionComponent<ChannelProps> = props => {
  const scale = useDevicePixelRatio();
  const { peaks, bits } = useWPSettings();
  const { waveHeight, waveOutlineColor } = useContext(ThemeContext);
  const { index, className } = props;
  const { progress, isPlaying } = usePlayoutStatus();
  const canvases: HTMLCanvasElement[] = [];

  const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
    const index: number = parseInt(canvas.dataset.index!, 10);
    canvases[index] = canvas;
  }, []);

  useEffect(() => {
    let offset = 0;
    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i];
      const cc: CanvasRenderingContext2D = canvas.getContext('2d')!;
      const h2 = waveHeight / 2;
      const maxValue = 2 ** (bits - 1);

      cc.clearRect(0, 0, canvas.width, canvas.height);
      cc.fillStyle = waveOutlineColor;
      cc.scale(scale, scale);

      const peakSegmentLength = canvas.width / scale;
      for (let i = 0; i < peakSegmentLength; i += 1) {
        const minPeak = peaks[(i + offset) * 2] / maxValue;
        const maxPeak = peaks[(i + offset) * 2 + 1] / maxValue;

        const min = Math.abs(minPeak * h2);
        const max = Math.abs(maxPeak * h2);

        // draw max
        cc.fillRect(i, 0, 1, h2 - max);
        // draw min
        cc.fillRect(i, h2 + min, 1, h2 - min);
      }

      offset += MAX_CANVAS_WIDTH;
    }
  }, [peaks, bits, waveHeight, waveOutlineColor, scale]);

  let totalWidth = peaks.length;
  let waveformCount = 0;
  const waveforms = [];
  while (totalWidth > 0) {
    const currentWidth = Math.min(totalWidth, MAX_CANVAS_WIDTH);
    const waveform = (
      <Waveform
        key={`${peaks.length}-${waveformCount}`}
        cssWidth={currentWidth}
        width={currentWidth * scale}
        height={waveHeight * scale}
        waveHeight={waveHeight}
        data-index={waveformCount}
        ref={canvasRef}
      />
    );

    waveforms.push(waveform);
    totalWidth -= currentWidth;
    waveformCount += 1;
  }

  return (
    <Wrapper index={index} cssWidth={peaks.length} className={className}>
      <Progress progress={progress} />
      {waveforms}
    </Wrapper>
  );
};

export const StyledChannel = withTheme(Channel);
