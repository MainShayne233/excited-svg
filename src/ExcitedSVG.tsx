import * as React from 'react';
import { DraggableCore, DraggableEventHandler } from 'react-draggable';

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
  handleDimension: number;
  dimensions: Dimensions;
  position: Position;
  children: JSX.Element;
  onDrag: DraggableEventHandler;
};

const ExcitedSVG: React.SFC<AppProps> = ({
  position,
  dimensions,
  borderPadding,
  handleDimension,
  children,
  onDrag,
}: AppProps) => (
  <svg>
    <DraggableCore onDrag={onDrag}>
      <svg
        x={position.x + borderPadding + handleDimension / 2}
        y={position.y + borderPadding + handleDimension / 2}
        style={{ cursor: 'move' }}
      >
        {children}
      </svg>
    </DraggableCore>
  </svg>
);

export default ExcitedSVG;
