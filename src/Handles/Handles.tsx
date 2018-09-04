import * as React from 'react';
import { DraggableCore, DraggableEventHandler } from 'react-draggable';
import { HANDLE_POSITIONS, ALL_HANDLE_POSITIONS } from '../constants/handles';
import { ExcitedElement, ExcitedOptions } from '../constants/types';

type HandlesProps = {
  element: ExcitedElement;
  options: ExcitedOptions;
  onHandleDrag: DraggableEventHandler;
};

type HandlesBorderProps = {
  element: ExcitedElement;
  options: ExcitedOptions;
};

type HandleGrabsProps = {
  element: ExcitedElement;
  options: ExcitedOptions;
  onHandleDrag: DraggableEventHandler;
};

type HandleProps = {
  element: ExcitedElement;
  options: ExcitedOptions;
  key: string;
  handlePositionName: string;
  onDrag: DraggableEventHandler;
};

const xHandlePosition = ({
  handlePositionName,
  element,
  options,
}: {
  handlePositionName: string;
  element: ExcitedElement;
  options: ExcitedOptions;
}) => {
  if (
    [
      HANDLE_POSITIONS.TOP_LEFT,
      HANDLE_POSITIONS.MIDDLE_LEFT,
      HANDLE_POSITIONS.BOTTOM_LEFT,
    ].includes(handlePositionName)
  ) {
    return element.positionX;
  } else if (
    [HANDLE_POSITIONS.TOP_CENTER, HANDLE_POSITIONS.BOTTOM_CENTER].includes(
      handlePositionName,
    )
  ) {
    return element.positionX + element.width / 2 + options.borderPadding;
  } else {
    return element.positionX + element.width + 2 * options.borderPadding;
  }
};
const yHandlePosition = ({
  handlePositionName,
  element,
  options,
}: {
  handlePositionName: string;
  element: ExcitedElement;
  options: ExcitedOptions;
}) => {
  if (
    [
      HANDLE_POSITIONS.TOP_LEFT,
      HANDLE_POSITIONS.TOP_CENTER,
      HANDLE_POSITIONS.TOP_RIGHT,
    ].includes(handlePositionName)
  ) {
    return element.positionY;
  } else if (
    [HANDLE_POSITIONS.MIDDLE_LEFT, HANDLE_POSITIONS.MIDDLE_RIGHT].includes(
      handlePositionName,
    )
  ) {
    return element.positionY + element.height / 2 + options.borderPadding;
  } else {
    return element.positionY + element.height + 2 * options.borderPadding;
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
  element,
  options,
  handlePositionName,
  onDrag,
}: HandleProps) => (
  <DraggableCore onDrag={onDrag.bind(null, handlePositionName)}>
    <rect
      x={xHandlePosition({
        handlePositionName,
        element,
        options,
      })}
      y={yHandlePosition({
        handlePositionName,
        element,
        options,
      })}
      fill="blue"
      height={options.handleDimension}
      width={options.handleDimension}
      style={handleStyle(handlePositionName)}
    />
  </DraggableCore>
);

const HandlesBorder: React.SFC<HandlesBorderProps> = ({
  element,
  options,
}: HandlesBorderProps) => (
  <rect
    id="handles"
    fill="none"
    stroke="blue"
    height={element.height + 2 * options.borderPadding}
    width={element.width + 2 * options.borderPadding}
    x={element.positionX + options.handleDimension / 2}
    y={element.positionY + options.handleDimension / 2}
  />
);

const HandleGrabs = ({ element, options, onHandleDrag }: HandleGrabsProps) => (
  <svg>
    {ALL_HANDLE_POSITIONS.map((handlePositionName) => (
      <Handle
        key={handlePositionName}
        handlePositionName={handlePositionName}
        element={element}
        options={options}
        onDrag={onHandleDrag}
      />
    ))}
  </svg>
);

const Handles: React.SFC<HandlesProps> = ({
  element,
  options,
  onHandleDrag,
}: HandlesProps) => (
  <svg>
    <HandlesBorder element={element} options={options} />
    <HandleGrabs
      element={element}
      options={options}
      onHandleDrag={onHandleDrag}
    />
  </svg>
);

export default Handles;
