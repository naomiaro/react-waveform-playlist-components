import styled from 'styled-components';

interface ChannelProps {
  readonly index: number;
  readonly cssWidth: number;
  readonly waveHeight: number;
}

export const Wrapper = styled.div<ChannelProps>`
  position: absolute;
  top: ${props => props.waveHeight * props.index}px;
  background: ${props => props.theme.waveFillColor};
  width: ${props => props.cssWidth}px;
  height: ${props => props.waveHeight}px;
`;
