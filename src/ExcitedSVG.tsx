import * as React from 'react';

type Dimensions = {
  height: number;
  width: number;
};

type Position = {
  x: number;
  y: number;
};

type AppProps = {
  borderPadding: number;
  dimensions: Dimensions;
  position: Position;
  children: JSX.Element;
};

const ExcitedSVG: React.SFC<AppProps> = (props: AppProps) => props.children;

export default ExcitedSVG;
