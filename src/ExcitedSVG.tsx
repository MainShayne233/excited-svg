import * as React from 'react';
import { DraggableCore, DraggableEventHandler } from 'react-draggable';
import Handles from './Handles/Handles';
import { ExcitedElement, ExcitedOptions } from './constants/types';

type Props = {
  element: ExcitedElement;
  options: ExcitedOptions;
  children: JSX.Element;
  onDrag: DraggableEventHandler;
  onHandleDrag: DraggableEventHandler;
};

const style = { cursor: 'move' };

const ExcitedSVG: React.SFC<Props> = ({
  element,
  options,
  children,
  onDrag,
  onHandleDrag,
}: Props) => (
  <svg>
    <DraggableCore onDrag={onDrag}>
      <svg
        x={
          element.positionX +
          options.borderPadding +
          options.handleDimension / 2
        }
        y={
          element.positionY +
          options.borderPadding +
          options.handleDimension / 2
        }
        style={style}
      >
        {children}
      </svg>
    </DraggableCore>
    <Handles element={element} options={options} onHandleDrag={onHandleDrag} />
  </svg>
);

export default ExcitedSVG;
