import { DraggableEventHandler } from 'react-draggable';

export type ExcitedSVGProps = {
  borderPadding: number;
  handleDimension: number;
  height: number;
  width: number;
  positionX: number;
  positionY: number;
  children: JSX.Element;
  onDrag: DraggableEventHandler;
  onHandleDrag: DraggableEventHandler;
};
