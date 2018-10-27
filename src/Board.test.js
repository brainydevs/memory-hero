import React from 'react';
import {shallow} from 'enzyme';
import Board from './Board';

it('renders without crashing', () => {
  shallow(<Board 
			 cards={[]}
			 onClick={(i) => console.log(i)}
  />);
});

xit('shows card value on click', () => {
  shallow(<Board 
			 cards={[]}
			 onClick={(i) => console.log(i)}
  />);
});
