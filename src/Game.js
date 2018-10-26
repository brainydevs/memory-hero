import React, {Component} from 'react';
import Board, {boardRows} from './Board';
import './Game.css';

class Game extends Component {
		constructor(props){
				super(props);
				this.state = {
						history :  [{ squares : Array(boardRows*boardRows).fill(null) , lastMove : ''}],
						cardVisible : false,
						stepNumber : 0
				};
		}

		jumpTo(move){
				const step = this.state.history.indexOf(move);
				this.setState({
						stepNumber : step,
						cardVisible : (step % 2) === 0
				});
		}

		handleClick(i) {
				const history = this.state.history.slice(0, this.state.stepNumber + 1);
				const current = history[history.length -1];
				const squares = current.squares.slice();
				if(isGameOver(squares) || squares[i]){
						return;
				}
				squares[i] = 'X';
				this.setState({
						history: history.concat({squares : squares, lastMove : getCoordinates(i)}),
						stepNumber: history.length,
						cardVisible : !this.state.cardVisible 
				});
		}

		render() {
				const history = this.state.history;
				const current = history[this.state.stepNumber];
				const winner = isGameOver(current.squares);

				const moves = history.map((move, step) => {
						const desc = (move.lastMove ?  move.lastMove: "Start");
						const isSelectedStep = step === this.state.stepNumber;
						return (
								<li key={move}>
										<button className={isSelectedStep ? 'bold' : ''} onClick={() => this.jumpTo(move)}> {desc} </button>
								</li>
								);
				});

				let status;
				if(winner){
						status = 'Winner. Game over.';
				}else{
						status = this.state.cardVisible ? 'Pick another card' : 'Pick any card';
				}

				return (
						<div className="game">
								<div className="game-board">
										<Board 
												squares={current.squares}
												onClick={(i) => this.handleClick(i)}
										/>
								</div>
								<div className="game-info">
										<div>{status}</div>
										<ol>{moves}</ol>
								</div>
						</div>
						);
		}
}

function isGameOver(squares) {
		  return !squares.includes(null);
}

function getCoordinates(square){
		return " ("+ (Math.floor(square / boardRows) + 1) + ',' + (square % boardRows + 1) + ')'
}

export default Game;
