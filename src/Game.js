import React, {Component} from 'react';
import Board, {boardRows} from './Board';
import './Game.css';

class Game extends Component {
		constructor(props){
				super(props);
				this.state = {
						history :  [{ cards : this.generateDeck(), lastMove : ''}],
						cardVisible : false,
						stepNumber : 0
				};
		}

		generateDeck(){
				  //TODO: fill with pairs of letters randomly
				  return Array(boardRows*boardRows).fill('x');
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
				const cards = current.cards.slice();
				if(isGameOver(cards) || cards[i]){
						return;
				}
				cards[i] = 'X';
				this.setState({
						history: history.concat({cards : cards, lastMove : getCoordinates(i)}),
						stepNumber: history.length,
						cardVisible : !this.state.cardVisible 
				});
		}

		render() {
				const history = this.state.history;
				const current = history[this.state.stepNumber];
				const winner = isGameOver(current.cards);

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
												cards={current.cards}
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

function isGameOver(cards) {
		  return !cards.includes(null);
}

function getCoordinates(card){
		return " ("+ (Math.floor(card / boardRows) + 1) + ',' + (card % boardRows + 1) + ')'
}

export default Game;
