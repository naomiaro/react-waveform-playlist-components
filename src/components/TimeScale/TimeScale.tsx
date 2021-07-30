import React, { FunctionComponent, useRef, useEffect, useContext } from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { PlaylistInfoContext } from '../../contexts/PlaylistInfo';
import { useDevicePixelRatio } from '../../contexts/DevicePixelRatio';
import { secondsToPixels } from '../../utils/conversions';

function formatTime(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  const s = seconds % 60;
  const m = (seconds - s) / 60;

  return `${m}:${String(s).padStart(2, '0')}`;
}

interface PlaylistTimeScaleScroll {
  readonly cssWidth: number;
  readonly controls: boolean;
  readonly controlWidth: number;
  readonly timeScaleHeight: number;
}
const PlaylistTimeScaleScroll = styled.div<PlaylistTimeScaleScroll>`
  position: relative;
  width: ${props => props.cssWidth}px;
  margin-left: ${props => (props.controls ? props.controlWidth : 0)}px;
  height: ${props => props.timeScaleHeight * 2}px;
`;

interface TimeTicks {
  readonly cssWidth: number;
  readonly timeScaleHeight: number;
}
const TimeTicks = styled.canvas<TimeTicks>`
  position: absolute;
  width: ${props => props.cssWidth}px;
  height: ${props => props.timeScaleHeight}px;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface TimeStamp {
  readonly left: number;
}
const TimeStamp = styled.div<TimeStamp>`
  left: ${props => props.left}px;
  position: absolute;
`;

export interface TimeScaleProps {
  readonly theme: DefaultTheme;
  readonly timeScaleHeight: number;
  readonly duration: number;
  readonly marker: number;
  readonly bigStep: number;
  readonly secondStep: number;
}

export const TimeScale: FunctionComponent<TimeScaleProps> = props => {
  const {
    theme: { timeColor },
    duration,
    marker,
    bigStep,
    secondStep,
  } = props;
  const canvasInfo = new Map();
  const timeMarkers = [];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    sampleRate,
    samplesPerPixel,
    timeScaleHeight,
    controls: { show: controls, width: controlWidth },
  } = useContext(PlaylistInfoContext);
  const devicePixelRatio = useDevicePixelRatio();

  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.resetTransform();
        ctx.fillStyle = timeColor;
        ctx.scale(devicePixelRatio, devicePixelRatio);

        for (const [pixLeft, scaleHeight] of canvasInfo.entries()) {
          const scaleY = timeScaleHeight - scaleHeight;
          ctx.fillRect(pixLeft, scaleY, 1, scaleHeight);
        }
      }
    }
  }, [
    duration,
    devicePixelRatio,
    timeColor,
    timeScaleHeight,
    bigStep,
    secondStep,
    marker,
    canvasInfo,
  ]);

  const widthX = secondsToPixels(duration / 1000, samplesPerPixel, sampleRate);
  const pixPerSec = sampleRate / samplesPerPixel;
  let counter = 0;

  for (let i = 0; i < widthX; i += (pixPerSec * secondStep) / 1000) {
    const pix = Math.floor(i);

    // create three levels of time markers - at marker point also place a timestamp.
    if (counter % marker === 0) {
      const timestamp = formatTime(counter);
      timeMarkers.push(
        <TimeStamp key={timestamp} left={pix}>
          {timestamp}
        </TimeStamp>
      );
      canvasInfo.set(pix, timeScaleHeight);
    } else if (counter % bigStep === 0) {
      canvasInfo.set(pix, Math.floor(timeScaleHeight / 2));
    } else if (counter % secondStep === 0) {
      canvasInfo.set(pix, Math.floor(timeScaleHeight / 5));
    }

    counter += secondStep;
  }

  return (
    <PlaylistTimeScaleScroll
      cssWidth={widthX}
      controls={controls}
      controlWidth={controlWidth}
      timeScaleHeight={timeScaleHeight}
    >
      {timeMarkers}
      <TimeTicks
        cssWidth={widthX}
        timeScaleHeight={timeScaleHeight}
        width={widthX * devicePixelRatio}
        height={timeScaleHeight * devicePixelRatio}
        ref={canvasRef}
      />
    </PlaylistTimeScaleScroll>
  );
};

export const StyledTimeScale = withTheme(TimeScale);
