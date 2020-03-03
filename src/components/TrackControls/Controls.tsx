import styled from 'styled-components';

export const Controls = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  background: white;
  text-align: center;
  width: ${props => props.theme.controlWidth}px;
  height: ${props => props.theme.waveHeight}px;
`;
