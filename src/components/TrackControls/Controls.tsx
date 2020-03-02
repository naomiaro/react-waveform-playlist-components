import styled from 'styled-components';

export interface ControlsProps {
  readonly controlWidth: number;
  readonly controlHeight: number;
}

export const Controls = styled.div<ControlsProps>`
  position: absolute;
  z-index: 1;
  left: 0;
  background: white;
  text-align: center;
  width: ${props => props.controlWidth}px;
  height: ${props => props.controlHeight}px;
`;
