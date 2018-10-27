import React, {Component} from 'react';
import Board, {boardRows} from './Board';
import './Game.css';

class Game extends Component {
		constructor(props){
				super(props);
				this.state = {
						history :  [{ cards : this.generateDeck(), lastMove : ''}],
						cardDisplayed : false,
						stepNumber : 0
				};
		}

		generateDeck(){
				  const deckSize = boardRows*boardRows;
				  const letters = ['a','b','c','d','e','f','g','h'];
				  let duplicatedItems = letters.reduce(
							 (res,current) => res.concat([current,current]),[]);
				  let orderedDeck = duplicatedItems
							 .map((letter) => { return {value : letter, visible: false}});
				  let shuffledDeck = [];
				  for(let i=0; i < deckSize; i++){
							 let randomIndex = Math.floor(Math.random() * 
										(orderedDeck.length - i)); 
							 shuffledDeck.push(orderedDeck.splice(randomIndex, 1)[0]);
				  }
				  return shuffledDeck;
		}

		handleClick(i) {
				const history = this.state.history.slice(0, this.state.stepNumber + 1);
				const current = history[history.length -1];
				const cards = current.cards.slice();
				if(isGameOver(cards) || cards[i].visible){
						return;
				}
				cards[i].visible = true;
				this.setState({
						history: history.concat({cards : cards, lastMove : getCoordinates(i)}),
						stepNumber: history.length,
						cardDisplayed : !this.state.cardDisplayed 
				});
		}

		render() {
				const history = this.state.history;
				const current = history[this.state.stepNumber];
				const winner = isGameOver(current.cards);

				const moves = history.map((move, step) => {
						const desc = (move.lastMove ?  move.lastMove: "Start");
						return (<li key={step}> <span> {desc} </span> </li>);
				});

				let status;
				if(winner){
						status = 'Winner. Game over.';
				}else{
						  status = this.state.cardDisplayed 
									 ? 'Pick another card' : 'Pick any card';
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
		  return false;
}

function getCoordinates(card){
		return " ("+ (Math.floor(card / boardRows) + 1) + ',' + (card % boardRows + 1) + ')'
}

export default Game;
