import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { myTheme } from '../src/wfpl-theme';

type DecoratorFunction = Parameters<typeof addDecorator>[0];

export interface StoryMetadata {
  component?: React.ReactNode;
  title: string;
  decorators?: DecoratorFunction[];
}

import {
  Button,
  ButtonGroup,
  Controls,
  Header,
  VolumeDownIcon,
  VolumeUpIcon,
  VolumeSlider,
  VolumeSliderWrapper,
} from '../src/components/TrackControls';

const metadata: StoryMetadata = {
  title: 'Track Controls',
  decorators: [
    (storyFn) => (
      <ThemeProvider theme={{ ...myTheme, controlWidth: 200 }}>
        {storyFn()}
      </ThemeProvider>
    ),
  ],
};

export default metadata;

export const Default = () => (
  <Controls>
    <Header>Track 1</Header>
    <ButtonGroup>
      <Button>Mute</Button>
      <Button>Solo</Button>
    </ButtonGroup>
    <VolumeSliderWrapper>
      <VolumeDownIcon />
      <VolumeSlider />
      <VolumeUpIcon />
    </VolumeSliderWrapper>
  </Controls>
);
