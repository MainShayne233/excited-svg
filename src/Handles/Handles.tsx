import * as React from 'react';
import { DraggableCore, DraggableEventHandler } from 'react-draggable';
import { HANDLE_POSITIONS, ALL_HANDLE_POSITIONS } from '../constants/handles';

type HandlesProps = {
  positionX: number;
  positionY: number;
  height: number;
  width: number;
  borderPadding: number;
  handleDimension: number;
  onHandleDrag: DraggableEventHandler;
};

type HandlesBorderProps = {
  positionX: number;
  positionY: number;
  height: number;
  width: number;
  borderPadding: number;
  handleDimension: number;
};

type HandleGrabsProps = {
  positionX: number;
  positionY: number;
  height: number;
  width: number;
  borderPadding: number;
  handleDimension: number;
  onHandleDrag: DraggableEventHandler;
};

type HandleProps = {
  positionX: number;
  positionY: number;
  key: string;
  handlePositionName: string;
  height: number;
  width: number;
  borderPadding: number;
  handleDimension: number;
  onDrag: DraggableEventHandler;
};

const xHandlePosition = ({
  handlePositionName,
  positionX,
  width,
  borderPadding,
}: {
  handlePositionName: string;
  positionX: number;
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
    return positionX;
  } else if (
    [HANDLE_POSITIONS.TOP_CENTER, HANDLE_POSITIONS.BOTTOM_CENTER].includes(
      handlePositionName,
    )
  ) {
    return positionX + width / 2 + borderPadding;
  } else {
    return positionX + width + 2 * borderPadding;
  }
};
const yHandlePosition = ({
  handlePositionName,
  positionY,
  height,
  borderPadding,
}: {
  handlePositionName: string;
  positionY: number;
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
    return positionY;
  } else if (
    [HANDLE_POSITIONS.MIDDLE_LEFT, HANDLE_POSITIONS.MIDDLE_RIGHT].includes(
      handlePositionName,
    )
  ) {
    return positionY + height / 2 + borderPadding;
  } else {
    return positionY + height + 2 * borderPadding;
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

const Handle = ({
  handlePositionName,
  positionX,
  positionY,
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
        positionX,
        width,
        borderPadding,
      })}
      y={yHandlePosition({
        handlePositionName,
        positionY,
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
  positionX,
  positionY,
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
    x={positionX + handleDimension / 2}
    y={positionY + handleDimension / 2}
  />
);

const HandleGrabs = ({
  positionX,
  positionY,
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
        positionX={positionX}
        positionY={positionY}
        borderPadding={borderPadding}
        handleDimension={handleDimension}
        onDrag={onHandleDrag}
      />
    ))}
  </svg>
);

const Handles: React.SFC<HandlesProps> = ({
  positionX,
  positionY,
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
      positionX={positionX}
      positionY={positionY}
      handleDimension={handleDimension}
    />
    <HandleGrabs
      borderPadding={borderPadding}
      height={height}
      width={width}
      positionX={positionX}
      positionY={positionY}
      handleDimension={handleDimension}
      onHandleDrag={onHandleDrag}
    />
  </svg>
);

export default Handles;
