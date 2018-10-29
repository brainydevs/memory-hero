import React from 'react';
import {shallow} from 'enzyme';
import Game from './Game';

const getHardcodedData = () => {
		  const heroNames = ['Deadpool','Spiderman','Capitan America','Thor','Hulk','Black Panther','Black Widow','Hawkeye'];
		  return new Promise((resolve, reject) => resolve(heroNames.map((name,step) => {return { id: step, name: name, img: '' }})));
};
let wrapper = shallow(<Game getData={getHardcodedData}/>);

it('contains a loading indicator', () => {
  expect(wrapper.find('Board').length).toBe(1);
});

it('passes props to board', () => {
  let board = wrapper.find('Board');
  expect(board).toHaveProp('cards');
  expect(board).toHaveProp('onClick');
});

it('generates cards with item IDs', () => {
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
