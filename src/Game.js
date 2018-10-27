import React, {Component} from 'react';
import Board, {boardRows} from './Board';
import './Game.css';

class Game extends Component {
		constructor(props){
				super(props);
				this.state = {
						cards : this.generateDeck(),
						cardDisplayed : false,
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
				const cards = this.state.cards.slice();
				if(isGameOver(cards) || cards[i].visible){
						return;
				}
				cards[i].visible = true;
				this.setState({
						cards: cards,
						cardDisplayed : !this.state.cardDisplayed 
				});
		}

		render() {
				const cards = this.state.cards.slice();
				const winner = isGameOver(cards);

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
												cards={cards}
												onClick={(i) => this.handleClick(i)}
										/>
								</div>
								<div className="game-info">
										<div>{status}</div>
								</div>
						</div>
						);
		}
}

function isGameOver(cards) {
		  return false;
}

export default Game;
