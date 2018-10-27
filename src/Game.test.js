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

it('generates cards with letter values', () => {
		  let generatedDeck = wrapper.state('history')[0].cards;
		  expect(generatedDeck.filter((c) => c.value === 'a').length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value === 'b').length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value === 'c').length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value === 'd').length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value === 'e').length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value === 'f').length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value === 'g').length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value === 'h').length).toBe(2);
});

it('displays card upon click event', () => {
		  let deck = wrapper.state('history')[0].cards;
		  let chosenCard = 5;
		  expect(deck[chosenCard].visible).toBe(false);
		  wrapper.instance().handleClick(chosenCard)
		  expect(deck[chosenCard].visible).toBe(true);
});
