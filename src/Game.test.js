import React from 'react';
import {shallow} from 'enzyme';
import Game from './Game';
//import Board from './Board';

let wrapper = shallow(<Game />);

it('contains a board', () => {
  expect(wrapper.find('Board').length).toBe(1);
});

it('passes props to board', () => {
  let board = wrapper.find('Board');
  expect(board).toHaveProp('cards');
  expect(board).toHaveProp('onClick');
});

it('generates cards with X values', () => {
  expect(wrapper.state('history')[0].cards).toContain('x');
});
