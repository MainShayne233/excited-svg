/* globals it describe */
import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import ExcitedSVG from '../src/ExcitedSVG';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const INITIAL_STATE = {
  borderPadding: 10,
  handleDimension: 10,
  height: 100,
  width: 100,
  positionX: 100,
  positionY: 100,
  onDrag: () => {},
  onHandleDrag: () => {},
  children: <div />,
};

describe('ExcitedSVG', () => {
  it('should render the component', () => {
    const componentInstance = ExcitedSVG(INITIAL_STATE);
    const mountedComponent = Enzyme.shallow(componentInstance);
  });
});
