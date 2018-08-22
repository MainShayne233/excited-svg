import * as React from 'react';
import { DraggableCore, DraggableEventHandler } from 'react-draggable';
import { Position, Dimensions } from '../constants/types';
import { HANDLE_POSITIONS, ALL_HANDLE_POSITIONS } from '../constants/handles';

type HandlesProps = {
  position: Position;
  height: number;
  width: number;
  borderPadding: number;
  handleDimension: number;
  onHandleDrag: DraggableEventHandler;
};

type HandlesBorderProps = {
  position: Position;
  height: number;
  width: number;
  borderPadding: number;
  handleDimension: number;
};

type HandleGrabsProps = {
  position: Position;
  height: number;
  width: number;
  borderPadding: number;
  handleDimension: number;
  onHandleDrag: DraggableEventHandler;
};

type HandleProps = {
  key: string;
  handlePositionName: string;
  position: Position;
  height: number;
  width: number;
  borderPadding: number;
  handleDimension: number;
  onDrag: DraggableEventHandler;
};

const xHandlePosition = ({
  handlePositionName,
  position,
  width,
  borderPadding,
}: {
  handlePositionName: string;
  position: Position;
  width: number;
  borderPadding: number;
}) => {
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
    return position.x + width / 2 + borderPadding;
  } else {
    return position.x + width + 2 * borderPadding;
  }
};
const yHandlePosition = ({
  handlePositionName,
  position,
  height,
  borderPadding,
}: {
  handlePositionName: string;
  position: Position;
  height: number;
  borderPadding: number;
}) => {
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
    return position.y + height / 2 + borderPadding;
  } else {
    return position.y + height + 2 * borderPadding;
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
  height,
  width,
  borderPadding,
  handleDimension,
  onDrag,
}: HandleProps) => (
  <DraggableCore onDrag={onDrag.bind(null, handlePositionName)}>
    <rect
      x={xHandlePosition({
        handlePositionName,
        position,
        width,
        borderPadding,
      })}
      y={yHandlePosition({
        handlePositionName,
        position,
        height,
        borderPadding,
      })}
      fill="blue"
      height={handleDimension}
      width={handleDimension}
      style={handleStyle(handlePositionName)}
    />
  </DraggableCore>
);

const HandlesBorder: React.SFC<HandlesBorderProps> = ({
  position,
  height,
  width,
  borderPadding,
  handleDimension,
}: HandlesBorderProps) => (
  <rect
    id="handles"
    fill="none"
    stroke="blue"
    height={height + 2 * borderPadding}
    width={width + 2 * borderPadding}
    x={position.x + handleDimension / 2}
    y={position.y + handleDimension / 2}
  />
);

const HandleGrabs = ({
  position,
  borderPadding,
  height,
  width,
  handleDimension,
  onHandleDrag,
}: HandleGrabsProps) => (
  <svg>
    {ALL_HANDLE_POSITIONS.map((handlePositionName) => (
      <Handle
        key={handlePositionName}
        handlePositionName={handlePositionName}
        height={height}
        width={width}
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
  height,
  width,
  borderPadding,
  handleDimension,
  onHandleDrag,
}: HandlesProps) => (
  <svg>
    <HandlesBorder
      borderPadding={borderPadding}
      height={height}
      width={width}
      position={position}
      handleDimension={handleDimension}
    />
    <HandleGrabs
      borderPadding={borderPadding}
      height={height}
      width={width}
      position={position}
      handleDimension={handleDimension}
      onHandleDrag={onHandleDrag}
    />
  </svg>
);

export default Handles;
