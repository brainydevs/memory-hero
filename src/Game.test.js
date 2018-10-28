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

it('generates cards with hero Ids', () => {
		  let generatedDeck = wrapper.state('cards');
		  expect(generatedDeck.filter((c) => c.value.id === 0).length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value.id === 1).length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value.id === 2).length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value.id === 3).length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value.id === 4).length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value.id === 5).length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value.id === 6).length).toBe(2);
		  expect(generatedDeck.filter((c) => c.value.id === 7).length).toBe(2);
});

it('displays card upon click event', () => {
		  let deck = wrapper.state('cards');
		  let chosenCard = 5;
		  expect(deck[chosenCard].visible).toBe(false);
		  wrapper.instance().handleClick(chosenCard)
		  expect(deck[chosenCard].visible).toBe(true);
});
