import { DraggableEventHandler } from 'react-draggable';

export type Dimensions = {
  height: number;
  width: number;
};

export type Position = {
  x: number;
  y: number;
};

export type ExcitedSVGProps = {
  borderPadding: number;
  handleDimension: number;
  height: number;
  width: number;
  position: Position;
  children: JSX.Element;
  onDrag: DraggableEventHandler;
  onHandleDrag: DraggableEventHandler;
};
