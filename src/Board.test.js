import React from 'react';
import {shallow} from 'enzyme';
import Board from './Board';

const board = shallow(<Board 
			 cards={[]}
			 rows={4}
			 onClick={(i) => console.log(i)}
  />);

it('creates rows^2 cards', () => {
		  const rows = board.instance().props.rows;
		  expect(board.find('.board-row').length).toBe(rows); 
		  expect(board.find('Card').length).toBe(rows*rows); 
});
