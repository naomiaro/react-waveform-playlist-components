import * as React from 'react';
import { DevicePixelRatioProvider } from '../../src/contexts/DevicePixelRatio';

export const DevicePixelRatioDecorator = (storyFn): JSX.Element => (
  <DevicePixelRatioProvider>{storyFn()}</DevicePixelRatioProvider>
);
