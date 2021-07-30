import styled from 'styled-components';

export interface ProgressProps {
  readonly progress: number;
  readonly waveHeight: number;
}
export const Progress = styled.div<ProgressProps>`
  position: absolute;
  background: ${props => props.theme.waveProgressColor};
  width: ${props => props.progress}px;
  height: ${props => props.waveHeight}px;
`;
