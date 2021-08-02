import React, { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { PlaylistInfoContext } from '../../contexts/PlaylistInfo';

interface ContainerProps {
  readonly numChannels: number;
  readonly waveHeight: number;
  readonly controlWidth: number;
}

const Container = styled.div<ContainerProps>`
  height: ${props => props.waveHeight * props.numChannels}px;
  margin-left: ${props => props.controlWidth}px;
`;

const ChannelContainer = styled.div`
  position: relative;
`;

export interface ControlsWrapperProps {
  readonly controlWidth: number;
}
const ControlsWrapper = styled.div<ControlsWrapperProps>`
  width: ${props => props.controlWidth}px;
  position: absolute;
  z-index: 1;
  left: 0;
  height: 100%;
`;

export interface TrackProps {
  className?: string;
  children?: ReactNode;
  controls?: ReactNode;
  numChannels: number;
}

export const Track: FunctionComponent<TrackProps> = ({
  numChannels,
  children,
  className,
  controls,
}) => {
  const {
    waveHeight,
    controls: { show, width },
  } = useContext(PlaylistInfoContext);
  return (
    <Container
      numChannels={numChannels}
      className={className}
      waveHeight={waveHeight}
      controlWidth={show ? width : 0}
    >
      <ControlsWrapper controlWidth={show ? width : 0}>
        {controls}
      </ControlsWrapper>
      <ChannelContainer>{children}</ChannelContainer>
    </Container>
  );
};
