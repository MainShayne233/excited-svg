import * as React from 'react';
import { DraggableCore, DraggableEventHandler } from 'react-draggable';
import Handles from './Handles/Handles';
import { ExcitedSVGProps } from './constants/types';

const ExcitedSVG: React.SFC<ExcitedSVGProps> = ({
  positionX,
  positionY,
  height,
  width,
  borderPadding,
  handleDimension,
  children,
  onDrag,
  onHandleDrag,
}: ExcitedSVGProps) => (
  <svg>
    <DraggableCore onDrag={onDrag}>
      <svg
        x={positionX + borderPadding + handleDimension / 2}
        y={positionY + borderPadding + handleDimension / 2}
        style={{ cursor: 'move' }}
      >
        {children}
      </svg>
    </DraggableCore>
    <Handles
      positionX={positionX}
      positionY={positionY}
      height={height}
      width={width}
      borderPadding={borderPadding}
      handleDimension={handleDimension}
      onHandleDrag={onHandleDrag}
    />
  </svg>
);

export default ExcitedSVG;
