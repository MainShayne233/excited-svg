/* eslint import/no-extraneous-dependencies: "off" */
import * as React from 'react';
import { hot } from 'react-hot-loader';
import ExcitedSVG from '../src/ExcitedSVG';

type Dimensions = {
  height: number;
  width: number;
};

type Position = {
  x: number;
  y: number;
};

type AppProps = {};
type AppState = {
  parent: App;
  borderPadding: number;
  dimensions: Dimensions;
  position: Position;
};

const IMAGE_HREF =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Elm_logo.svg/2000px-Elm_logo.svg.png';

const INITIAL_STATE = {
  borderPadding: 10,
  dimensions: {
    height: 100,
    width: 100,
  },
  position: {
    x: 100,
    y: 100,
  },
};

const StateForm = ({
  dimensions,
  position,
  borderPadding,
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
          value={dimensions.height}
        />
        <label htmlFor="width">Width</label>
        <input
          onChange={parent.handleWidthChange.bind(parent)}
          type="number"
          name="width"
          value={dimensions.width}
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
      </p>
    </fieldset>
  </form>
);

const AppView = (state: AppState) => (
  <div>
    <svg height="500" width="500">
      <ExcitedSVG
        dimensions={state.dimensions}
        position={state.position}
        borderPadding={state.borderPadding}
      >
        <image
          height={state.dimensions.height}
          width={state.dimensions.width}
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
        dimensions: { ...this.state.dimensions, height: parsedValue },
      });
    }
  }

  handleWidthChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setState({
        ...this.state,
        dimensions: { ...this.state.dimensions, width: parsedValue },
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

  render() {
    return AppView({ ...this.state });
  }
}

export default hot(module)(App);
