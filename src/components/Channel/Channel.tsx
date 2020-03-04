import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { withTheme, ThemeContext, DefaultTheme } from 'styled-components';
import { Progress } from './Progress';
import { Wrapper } from './Wrapper';
import { Waveform } from './Waveform';
import { useDevicePixelRatio } from '../../contexts/DevicePixelRatio';
import { usePlayoutStatus } from '../../contexts/Playout';

const MAX_CANVAS_WIDTH = 1000;

export interface ChannelProps {
  className?: string;
  index: number;
  theme?: DefaultTheme;
  data: Peaks;
  bits: Bits;
  length: number;
}

export const Channel: FunctionComponent<ChannelProps> = props => {
  const scale = useDevicePixelRatio();
  const { waveHeight, waveOutlineColor } = useContext(ThemeContext);
  const { data, bits, length, index, className } = props;
  const { progress } = usePlayoutStatus();
  const canvases: HTMLCanvasElement[] = [];

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas !== null) {
        const index: number = parseInt(canvas.dataset.index!, 10);
        canvases[index] = canvas;
      }
    },
    [data, bits, waveHeight, waveOutlineColor, scale, length]
  );

  useEffect(() => {
    let offset = 0;
    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i];
      const cc = canvas.getContext('2d');
      const h2 = waveHeight / 2;
      const maxValue = 2 ** (bits - 1);

      if (cc) {
        cc.clearRect(0, 0, canvas.width, canvas.height);
        cc.fillStyle = waveOutlineColor;
        cc.scale(scale, scale);

        const peakSegmentLength = canvas.width / scale;
        for (let i = 0; i < peakSegmentLength; i += 1) {
          const minPeak = data[(i + offset) * 2] / maxValue;
          const maxPeak = data[(i + offset) * 2 + 1] / maxValue;

          const min = Math.abs(minPeak * h2);
          const max = Math.abs(maxPeak * h2);

          // draw max
          cc.fillRect(i, 0, 1, h2 - max);
          // draw min
          cc.fillRect(i, h2 + min, 1, h2 - min);
        }
      }

      offset += MAX_CANVAS_WIDTH;
    }
  }, [data, bits, waveHeight, waveOutlineColor, scale, length]);

  let totalWidth = length;
  let waveformCount = 0;
  const waveforms = [];
  while (totalWidth > 0) {
    const currentWidth = Math.min(totalWidth, MAX_CANVAS_WIDTH);
    const waveform = (
      <Waveform
        key={`${length}-${waveformCount}`}
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
    <Wrapper index={index} cssWidth={length} className={className}>
      <Progress progress={progress} />
      {waveforms}
    </Wrapper>
  );
};

export const StyledChannel = withTheme(Channel);
