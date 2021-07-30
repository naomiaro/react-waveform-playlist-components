import styled from 'styled-components';

export interface ContainerProps {
  readonly numChannels: number;
  readonly waveHeight: number;
  readonly controlWidth: number;
}
export const Container = styled.div<ContainerProps>`
  height: ${props => props.waveHeight * props.numChannels}px;
  margin-left: ${props => props.controlWidth}px;
`;
