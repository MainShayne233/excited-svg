/* eslint import/no-extraneous-dependencies: "off" */
import * as React from 'react';
import { hot } from 'react-hot-loader';
import ExcitedSVG from '../src/ExcitedSVG';

type Position = {
  x: number;
  y: number;
};

type AppProps = {};
type AppState = {
  parent: App;
  borderPadding: number;
  handleDimension: number;
  height: number;
  width: number;
  position: Position;
};

const IMAGE_HREF =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Elm_logo.svg/2000px-Elm_logo.svg.png';

const INITIAL_STATE = {
  borderPadding: 10,
  handleDimension: 10,
  height: 100,
  width: 100,
  position: {
    x: 100,
    y: 100,
  },
};

const StateForm = ({
  height,
  width,
  position,
  borderPadding,
  handleDimension,
  parent,
}: AppState) => (
  <form>
    <fieldset>
      <legend>Dimensions</legend>
      <p>
        <label htmlFor="height">Height</label>
        <input
          onChange={parent.handleHeightChange.bind(parent)}
          type="number"
          name="height"
          value={height}
        />
        <label htmlFor="width">Width</label>
        <input
          onChange={parent.handleWidthChange.bind(parent)}
          type="number"
          name="width"
          value={width}
        />
      </p>
      <legend>Position</legend>
      <p>
        <label htmlFor="x">X</label>
        <input
          onChange={parent.handlePositionXChange.bind(parent)}
          type="number"
          name="x"
          value={position.x}
        />
        <label htmlFor="y">Y</label>
        <input
          onChange={parent.handlePositionYChange.bind(parent)}
          type="number"
          name="y"
          value={position.y}
        />
      </p>
      <legend>Misc</legend>
      <p>
        <label htmlFor="borderPadding">Border Padding</label>
        <input
          onChange={parent.handleBorderPaddingChange.bind(parent)}
          type="number"
          name="borderPadding"
          value={borderPadding}
        />
        <label htmlFor="handleDimension">Handle Dimension</label>
        <input
          onChange={parent.handleHandleDimensionChange.bind(parent)}
          type="number"
          name="handleDimension"
          value={handleDimension}
        />
      </p>
    </fieldset>
  </form>
);

const AppView = (state: AppState) => (
  <div>
    <svg height="500" width="500">
      <ExcitedSVG
        height={state.height}
        width={state.width}
        position={state.position}
        borderPadding={state.borderPadding}
        handleDimension={state.handleDimension}
        onDrag={state.parent.onDrag.bind(state.parent)}
        onHandleDrag={state.parent.onHandleDrag.bind(state.parent)}
      >
        <image
          height={state.height}
          width={state.width}
          preserveAspectRatio="none"
          href={IMAGE_HREF}
        />
      </ExcitedSVG>
    </svg>
    {StateForm(state)}
  </div>
);

class App extends React.Component<AppProps, AppState> {
  constructor(props: object) {
    super(props);
    this.state = { ...INITIAL_STATE, parent: this };
  }

  handleHeightChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setState({
        ...this.state,
        height: parsedValue,
      });
    }
  }

  handleWidthChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setState({
        ...this.state,
        width: parsedValue,
      });
    }
  }

  handlePositionXChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setState({
        ...this.state,
        position: { ...this.state.position, x: parsedValue },
      });
    }
  }

  handlePositionYChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setState({
        ...this.state,
        position: { ...this.state.position, y: parsedValue },
      });
    }
  }

  handleBorderPaddingChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setState({
        ...this.state,
        borderPadding: parsedValue,
      });
    }
  }

  handleHandleDimensionChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setState({
        ...this.state,
        handleDimension: parsedValue,
      });
    }
  }

  onDrag(
    event: MouseEvent,
    { deltaX, deltaY }: { deltaX: number; deltaY: number },
  ) {
    this.setState({
      ...this.state,
      position: {
        x: this.state.position.x + deltaX,
        y: this.state.position.y + deltaY,
      },
    });
  }

  onHandleDrag(
    handleName: string,
    event: MouseEvent,
    { deltaX, deltaY }: { deltaX: number; deltaY: number },
  ) {
    console.log(handleName);
    switch (handleName) {
      case 'TOP_CENTER': {
        this.setState({
          ...this.state,
          height: this.state.height - deltaY,
          position: {
            ...this.state.position,
            y: this.state.position.y + deltaY,
          },
        });
        break;
      }

      case 'TOP_RIGHT': {
        this.setState({
          ...this.state,
          height: this.state.height - deltaY,
          width: this.state.width + deltaX,
          position: {
            ...this.state.position,
            y: this.state.position.y + deltaY,
          },
        });
        break;
      }

      case 'TOP_LEFT': {
        this.setState({
          ...this.state,
          height: this.state.height - deltaY,
          width: this.state.width - deltaX,
          position: {
            ...this.state.position,
            x: this.state.position.x + deltaX,
            y: this.state.position.y + deltaY,
          },
        });
        break;
      }

      case 'MIDDLE_LEFT': {
        this.setState({
          ...this.state,
          width: this.state.width - deltaX,
          position: {
            ...this.state.position,
            x: this.state.position.x + deltaX,
          },
        });
        break;
      }

      case 'MIDDLE_RIGHT': {
        this.setState({
          ...this.state,
          width: this.state.width + deltaX,
        });
        break;
      }

      case 'BOTTOM_LEFT': {
        this.setState({
          ...this.state,
          height: this.state.height + deltaY,
          width: this.state.width - deltaX,
          position: {
            ...this.state.position,
            x: this.state.position.x + deltaX,
          },
        });
        break;
      }

      case 'BOTTOM_CENTER': {
        this.setState({
          ...this.state,
          height: this.state.height + deltaY,
        });
        break;
      }

      case 'BOTTOM_RIGHT': {
        this.setState({
          ...this.state,
          height: this.state.height + deltaY,
          width: this.state.width + deltaX,
        });
        break;
      }
    }
  }

  render() {
    return AppView({ ...this.state });
  }
}

export default hot(module)(App);
