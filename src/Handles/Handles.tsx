import * as React from 'react';
import { DraggableCore, DraggableEventHandler } from 'react-draggable';
import { Position, Dimensions } from '../types';
import { HANDLE_POSITIONS, ALL_HANDLE_POSITIONS } from '../constants/handles';

type HandlesProps = {
  position: Position;
  dimensions: Dimensions;
  borderPadding: number;
  handleDimension: number;
  onHandleDrag: DraggableEventHandler;
};

type HandlesBorderProps = {
  position: Position;
  dimensions: Dimensions;
  borderPadding: number;
  handleDimension: number;
};

type HandleGrabsProps = {
  position: Position;
  dimensions: Dimensions;
  borderPadding: number;
  handleDimension: number;
  onHandleDrag: DraggableEventHandler;
};

type HandleProps = {
  key: string;
  handlePositionName: string;
  position: Position;
  dimensions: Dimensions;
  borderPadding: number;
  handleDimension: number;
  onDrag: DraggableEventHandler;
};

const xHandlePosition = (
  handlePositionName: string,
  position: Position,
  dimensions: Dimensions,
  borderPadding: number,
) => {
  if (
    [
      HANDLE_POSITIONS.TOP_LEFT,
      HANDLE_POSITIONS.MIDDLE_LEFT,
      HANDLE_POSITIONS.BOTTOM_LEFT,
    ].includes(handlePositionName)
  ) {
    return position.x;
  } else if (
    [HANDLE_POSITIONS.TOP_CENTER, HANDLE_POSITIONS.BOTTOM_CENTER].includes(
      handlePositionName,
    )
  ) {
    return position.x + dimensions.width / 2 + borderPadding;
  } else {
    return position.x + dimensions.width + 2 * borderPadding;
  }
};

const yHandlePosition = (
  handlePositionName: string,
  position: Position,
  dimensions: Dimensions,
  borderPadding: number,
) => {
  if (
    [
      HANDLE_POSITIONS.TOP_LEFT,
      HANDLE_POSITIONS.TOP_CENTER,
      HANDLE_POSITIONS.TOP_RIGHT,
    ].includes(handlePositionName)
  ) {
    return position.y;
  } else if (
    [HANDLE_POSITIONS.MIDDLE_LEFT, HANDLE_POSITIONS.MIDDLE_RIGHT].includes(
      handlePositionName,
    )
  ) {
    return position.y + dimensions.height / 2 + borderPadding;
  } else {
    return position.y + dimensions.height + 2 * borderPadding;
  }
};

const cursorForHandlePositionName = (handlePositionName: string) => {
  if (
    [HANDLE_POSITIONS.TOP_CENTER, HANDLE_POSITIONS.BOTTOM_CENTER].includes(
      handlePositionName,
    )
  ) {
    return 'ns-resize';
  } else if (
    [HANDLE_POSITIONS.MIDDLE_LEFT, HANDLE_POSITIONS.MIDDLE_RIGHT].includes(
      handlePositionName,
    )
  ) {
    return 'ew-resize';
  } else if (
    [HANDLE_POSITIONS.TOP_LEFT, HANDLE_POSITIONS.BOTTOM_RIGHT].includes(
      handlePositionName,
    )
  ) {
    return 'nwse-resize';
  } else {
    return 'nesw-resize';
  }
};

const handleStyle = (handlePositionName: string) => ({
  cursor: cursorForHandlePositionName(handlePositionName),
});

const handleHandleDrag = (
  handlePositionName: string,
  event: MouseEvent,
  data: object,
) => {
  if (handlePositionName === HANDLE_POSITIONS.MIDDLE_RIGHT) {
    console.log(event, data);
  }
};

const Handle = ({
  handlePositionName,
  position,
  dimensions,
  borderPadding,
  handleDimension,
  onDrag,
}: HandleProps) => (
  <DraggableCore onDrag={onDrag.bind(null, handlePositionName)}>
    <rect
      x={xHandlePosition(
        handlePositionName,
        position,
        dimensions,
        borderPadding,
      )}
      y={yHandlePosition(
        handlePositionName,
        position,
        dimensions,
        borderPadding,
      )}
      fill="blue"
      height={handleDimension}
      width={handleDimension}
      style={handleStyle(handlePositionName)}
    />
  </DraggableCore>
);

const HandlesBorder: React.SFC<HandlesBorderProps> = ({
  position,
  dimensions,
  borderPadding,
  handleDimension,
}: HandlesBorderProps) => (
  <rect
    id="handles"
    fill="none"
    stroke="blue"
    height={dimensions.height + 2 * borderPadding}
    width={dimensions.width + 2 * borderPadding}
    x={position.x + handleDimension / 2}
    y={position.y + handleDimension / 2}
  />
);

const HandleGrabs = ({
  position,
  borderPadding,
  dimensions,
  handleDimension,
  onHandleDrag,
}: HandleGrabsProps) => (
  <svg>
    {ALL_HANDLE_POSITIONS.map((handlePositionName) => (
      <Handle
        key={handlePositionName}
        handlePositionName={handlePositionName}
        dimensions={dimensions}
        position={position}
        borderPadding={borderPadding}
        handleDimension={handleDimension}
        onDrag={onHandleDrag}
      />
    ))}
  </svg>
);

const Handles: React.SFC<HandlesProps> = ({
  position,
  dimensions,
  borderPadding,
  handleDimension,
  onHandleDrag,
}: HandlesProps) => (
  <svg>
    <HandlesBorder
      borderPadding={borderPadding}
      dimensions={dimensions}
      position={position}
      handleDimension={handleDimension}
    />
    <HandleGrabs
      borderPadding={borderPadding}
      dimensions={dimensions}
      position={position}
      handleDimension={handleDimension}
      onHandleDrag={onHandleDrag}
    />
  </svg>
);

export default Handles;
