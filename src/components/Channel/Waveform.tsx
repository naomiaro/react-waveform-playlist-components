import styled from 'styled-components';

interface WaveformProps {
  readonly cssWidth: number;
  readonly waveHeight: number;
}

export const Waveform = styled.canvas<WaveformProps>`
  float: left;
  position: relative;
  width: ${props => props.cssWidth}px;
  height: ${props => props.waveHeight}px;
`;
