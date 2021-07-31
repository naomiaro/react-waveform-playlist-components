import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import styled, {
  withTheme,
  ThemeContext,
  DefaultTheme,
} from 'styled-components';
import { useDevicePixelRatio } from '../../contexts/DevicePixelRatio';
import { PlaylistInfoContext } from '../../contexts/PlaylistInfo';
import { Peaks, Bits } from 'webaudio-peaks';

const MAX_CANVAS_WIDTH = 1000;

interface ProgressProps {
  readonly progress: number;
  readonly waveHeight: number;
}
const Progress = styled.div<ProgressProps>`
  position: absolute;
  background: ${props => props.theme.waveProgressColor};
  width: ${props => props.progress}px;
  height: ${props => props.waveHeight}px;
`;

interface WaveformProps {
  readonly cssWidth: number;
  readonly waveHeight: number;
}

const Waveform = styled.canvas<WaveformProps>`
  float: left;
  position: relative;
  width: ${props => props.cssWidth}px;
  height: ${props => props.waveHeight}px;
`;

interface WrapperProps {
  readonly index: number;
  readonly cssWidth: number;
  readonly waveHeight: number;
}

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  top: ${props => props.waveHeight * props.index}px;
  background: ${props => props.theme.waveFillColor};
  width: ${props => props.cssWidth}px;
  height: ${props => props.waveHeight}px;
`;

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
  const { waveOutlineColor } = useContext(ThemeContext);
  const { waveHeight } = useContext(PlaylistInfoContext);
  const devicePixelRatio = useDevicePixelRatio();
  const { data, bits, length, index, className, progress = 0 } = props;
  const canvases: HTMLCanvasElement[] = [];

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas !== null) {
        const index: number = parseInt(canvas.dataset.index!, 10);
        canvases[index] = canvas;
      }
    },
    [canvases]
  );

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
    <Wrapper
      index={index}
      cssWidth={length}
      className={className}
      waveHeight={waveHeight}
    >
      <Progress progress={progress} waveHeight={waveHeight} />
      {waveforms}
    </Wrapper>
  );
};

export const StyledChannel = withTheme(Channel);
