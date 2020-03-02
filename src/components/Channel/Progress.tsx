import styled from 'styled-components';

interface ProgressProps {
  readonly progress: number;
}

export const Progress = styled.div<ProgressProps>`
  position: absolute;
  background: ${props => props.theme.waveProgressColor};
  width: ${props => props.progress}px;
  height: ${props => props.theme.waveHeight}px;
`;
