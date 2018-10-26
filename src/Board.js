import React, {Component} from 'react';

export const boardRows = 4;
export default class Board extends Component {
		renderSquare(i) {
				return (
						<Square key={i} value={this.props.squares[i]}
								onClick={() => this.props.onClick(i)} />
						);
		}
		renderRow(row) {
				let renderedSquares = [];
				for(let i = (row - 1) * boardRows; i < row * boardRows; i++){
						renderedSquares.push(this.renderSquare(i));
				}
				return renderedSquares;
		}
		renderBoard(){
				let board = [];
				for(let i=1; i <= boardRows; i++){
						board.push(
								<div key={i} className="board-row">
										{this.renderRow(i)}
								</div>
								);
				}
				return board;
		}

		render() {
				return (
						<div>
								{this.renderBoard()}
						</div>
						);
		}
}

function Square(props){
		return (
				<button className='square' onClick={props.onClick}>
						{props.value}
				</button>
				);
}

