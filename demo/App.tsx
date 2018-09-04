/* eslint import/no-extraneous-dependencies: "off" */
import * as React from 'react';
import { hot } from 'react-hot-loader';
import ExcitedSVG from '../src/ExcitedSVG';
import { ExcitedElement, ExcitedOptions } from '../src/constants/types';

type AppProps = {};
type AppState = {
  parent: App;
  element: ExcitedElement;
  options: ExcitedOptions;
};

const IMAGE_HREF =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Elm_logo.svg/2000px-Elm_logo.svg.png';

const INITIAL_STATE = {
  options: {
    borderPadding: 10,
    handleDimension: 10,
  },
  element: {
    height: 100,
    width: 100,
    positionX: 100,
    positionY: 100,
  },
};

const StateForm = ({ element, options, parent }: AppState) => (
  <form>
    <fieldset>
      <legend>Dimensions</legend>
      <p>
        <label htmlFor="height">Height</label>
        <input
          onChange={parent.handleHeightChange.bind(parent)}
          type="number"
          name="height"
          value={element.height}
        />
        <label htmlFor="width">Width</label>
        <input
          onChange={parent.handleWidthChange.bind(parent)}
          type="number"
          name="width"
          value={element.width}
        />
      </p>
      <legend>Position</legend>
      <p>
        <label htmlFor="x">X</label>
        <input
          onChange={parent.handlePositionXChange.bind(parent)}
          type="number"
          name="x"
          value={element.positionX}
        />
        <label htmlFor="y">Y</label>
        <input
          onChange={parent.handlePositionYChange.bind(parent)}
          type="number"
          name="y"
          value={element.positionY}
        />
      </p>
      <legend>Misc</legend>
      <p>
        <label htmlFor="borderPadding">Border Padding</label>
        <input
          onChange={parent.handleBorderPaddingChange.bind(parent)}
          type="number"
          name="borderPadding"
          value={options.borderPadding}
        />
        <label htmlFor="handleDimension">Handle Dimension</label>
        <input
          onChange={parent.handleHandleDimensionChange.bind(parent)}
          type="number"
          name="handleDimension"
          value={options.handleDimension}
        />
      </p>
    </fieldset>
  </form>
);

const AppView = (state: AppState) => (
  <div>
    <svg height="500" width="500">
      <ExcitedSVG
        element={state.element}
        options={state.options}
        onDrag={state.parent.onDrag.bind(state.parent)}
        onHandleDrag={state.parent.onHandleDrag.bind(state.parent)}
      >
        <image
          height={state.element.height}
          width={state.element.width}
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
      this.setElementState({
        height: parsedValue,
      });
    }
  }

  handleWidthChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setElementState({
        width: parsedValue,
      });
    }
  }

  handlePositionXChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setElementState({
        positionX: parsedValue,
      });
    }
  }

  handlePositionYChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setElementState({
        positionY: parsedValue,
      });
    }
  }

  handleBorderPaddingChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setOptionsState({
        borderPadding: parsedValue,
      });
    }
  }

  handleHandleDimensionChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseInt(target.value);
    if (!isNaN(parsedValue)) {
      this.setOptionsState({
        handleDimension: parsedValue,
      });
    }
  }

  setElementState(params: object) {
    this.setState({
      element: {
        ...this.state.element,
        ...params,
      },
    });
  }

  setOptionsState(params: object) {
    this.setState({
      options: {
        ...this.state.options,
        ...params,
      },
    });
  }

  addToElementState({ positionX = 0, positionY = 0, height = 0, width = 0 }) {
    this.setElementState({
      positionX: this.state.element.positionX + positionX,
      positionY: this.state.element.positionY + positionY,
      height: this.state.element.height + height,
      width: this.state.element.width + width,
    });
  }

  onDrag(
    event: MouseEvent,
    { deltaX, deltaY }: { deltaX: number; deltaY: number },
  ) {
    this.addToElementState({ positionX: deltaX, positionY: deltaY });
  }

  onHandleDrag(
    handleName: string,
    event: MouseEvent,
    { deltaX, deltaY }: { deltaX: number; deltaY: number },
  ) {
    switch (handleName) {
      case 'TOP_CENTER': {
        this.addToElementState({
          height: deltaY * -1,
          positionY: deltaY,
        });
        break;
      }
      case 'TOP_RIGHT': {
        this.addToElementState({
          height: deltaY * -1,
          width: deltaX,
          positionY: deltaY,
        });
        break;
      }
      case 'TOP_LEFT': {
        this.addToElementState({
          height: deltaY * -1,
          width: deltaX * -1,
          positionX: deltaX,
          positionY: deltaY,
        });
        break;
      }
      case 'MIDDLE_LEFT': {
        this.addToElementState({
          width: deltaX * -1,
          positionX: deltaX,
        });
        break;
      }
      case 'MIDDLE_RIGHT': {
        this.addToElementState({
          width: deltaX,
        });
        break;
      }
      case 'BOTTOM_LEFT': {
        this.addToElementState({
          height: deltaY,
          width: deltaX * -1,
          positionX: deltaX,
        });
        break;
      }
      case 'BOTTOM_CENTER': {
        this.addToElementState({
          height: deltaY,
        });
        break;
      }
      case 'BOTTOM_RIGHT': {
        this.addToElementState({
          height: deltaY,
          width: deltaX,
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
