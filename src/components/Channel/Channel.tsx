import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { withTheme, ThemeContext, DefaultTheme } from 'styled-components';
import { useDevicePixelRatio } from '../../contexts/DevicePixelRatio';
import { Progress } from './Progress';
import { Wrapper } from './Wrapper';
import { Waveform } from './Waveform';

const MAX_CANVAS_WIDTH = 1000;

export interface ChannelProps {
  className?: string;
  index: number;
  theme?: DefaultTheme;
  data: Peaks;
  bits: Bits;
  length: number;
  progress?: number;
}

export const Channel: FunctionComponent<ChannelProps> = props => {
  const { waveHeight, waveOutlineColor } = useContext(ThemeContext);
  const devicePixelRatio = useDevicePixelRatio();
  const { data, bits, length, index, className, progress = 0 } = props;
  const canvases: HTMLCanvasElement[] = [];

  const canvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
    if (canvas !== null) {
      const index: number = parseInt(canvas.dataset.index!, 10);
      canvases[index] = canvas;
    }
  }, []);

  useEffect(() => {
    let offset = 0;
    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i];
      const ctx = canvas.getContext('2d');
      const h2 = waveHeight / 2;
      const maxValue = 2 ** (bits - 1);

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.resetTransform();
        ctx.fillStyle = waveOutlineColor;
        ctx.scale(devicePixelRatio, devicePixelRatio);

        const peakSegmentLength = canvas.width / devicePixelRatio;
        for (let i = 0; i < peakSegmentLength; i += 1) {
          const minPeak = data[(i + offset) * 2] / maxValue;
          const maxPeak = data[(i + offset) * 2 + 1] / maxValue;

          const min = Math.abs(minPeak * h2);
          const max = Math.abs(maxPeak * h2);

          // draw max
          ctx.fillRect(i, 0, 1, h2 - max);
          // draw min
          ctx.fillRect(i, h2 + min, 1, h2 - min);
        }
      }

      offset += MAX_CANVAS_WIDTH;
    }
  }, [
    data,
    bits,
    waveHeight,
    waveOutlineColor,
    devicePixelRatio,
    length,
    canvases,
  ]);

  let totalWidth = length;
  let waveformCount = 0;
  const waveforms = [];
  while (totalWidth > 0) {
    const currentWidth = Math.min(totalWidth, MAX_CANVAS_WIDTH);
    const waveform = (
      <Waveform
        key={`${length}-${waveformCount}`}
        cssWidth={currentWidth}
        width={currentWidth * devicePixelRatio}
        height={waveHeight * devicePixelRatio}
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
    <Wrapper index={index} cssWidth={length} className={className}>
      <Progress progress={progress} />
      {waveforms}
    </Wrapper>
  );
};

export const StyledChannel = withTheme(Channel);
