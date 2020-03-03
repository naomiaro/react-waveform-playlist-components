import styled from 'styled-components';

export interface ContainerProps {
  readonly numChannels: number;
}
export const Container = styled.div<ContainerProps>`
  height: ${props => props.theme.waveHeight * props.numChannels}px;
  margin-left: ${props => props.theme.controlWidth}px;
`;
