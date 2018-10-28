import React, {Component} from 'react';
import Board, {boardRows} from './Board';
import icon from './favicon.ico';
import './Game.css';

class Game extends Component {
		constructor(props){
				super(props);
				this.state = {
						cards : this.generateDeck(),
						previousCard: null,
						moveCounter: 0
				};
		}

		generateDeck(){
				  const deckSize = boardRows*boardRows;
				  const heroNames = ['Deadpool','Spiderman','Capitan America','Thor','Hulk','Black Panther','Black Widow','Hawkeye'];
				  const heroCollection = heroNames.map((name,step) => {return { id: step, name: name, img: icon }});
				  let duplicatedItems = heroCollection.reduce(
							 (res,current) => res.concat([current,current]),[]);
				  let orderedDeck = duplicatedItems
							 .map((hero) => { return {value : hero, visible: false}});
				  let shuffledDeck = [];
				  for(let i=0; i < deckSize; i++){
							 let randomIndex = Math.floor(Math.random() * 
										(orderedDeck.length - i)); 
							 shuffledDeck.push(orderedDeck.splice(randomIndex, 1)[0]);
				  }
				  return shuffledDeck;
		}

		hideCardsWithDelay(cardsToHide){
				  setTimeout(() => {
							 if(cardsToHide){
										const cards = this.state.cards.slice();
										cardsToHide.forEach((card) => {
												  cards[card].visible = false;
										});
										this.setState({ cards : cards });
							 }
				  },300);
		}

		handleClick(i) {
				const cards = this.state.cards.slice();
				let previousCard = this.state.previousCard;
				if(isGameOver(cards) || cards[i].visible){
						return;
				}
				cards[i].visible = true; //always show
				if(previousCard !== null){ //has previously selected card
						  if(cards[previousCard].value.id !== cards[i].value.id){ 
									 this.hideCardsWithDelay([previousCard, i]);
						  }
						  previousCard = null; //clear
				}else{
						  previousCard = i;
				}
				this.setState({
						cards: cards,
						previousCard : previousCard,
						moveCounter : this.state.moveCounter + 1
				});
		}

		render() {
				const cards = this.state.cards.slice();
				const winner = isGameOver(cards);

				let status;
				if(winner){
						  status = 'Congrats! You\'ve won the game in ' 
									 + this.state.moveCounter + ' moves.';
				}else{
						  status = 'Moves: ' + this.state.moveCounter;
				} 
				return (
						<div className="game">
								<div className="game-info">
										<div>{status}</div>
								</div>
								<div className="game-board">
										<Board 
												cards={cards}
												onClick={(i) => this.handleClick(i)}
										/>
								</div>
						</div>
						);
		}
}

function isGameOver(cards) {
		  return !cards.map((card) => card.visible).includes(false);
}

export default Game;
