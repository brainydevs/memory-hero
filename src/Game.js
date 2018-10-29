import React, {Component} from 'react';
import Board from './Board';
import 'whatwg-fetch';
import {Auth} from './ApiKeys'
import './Game.css';

class Game extends Component {
		constructor(props){
				super(props);
				const boardRows = props.rows || 4;
				this.state = {
						  cards : [],
						  previousCard: null,
						  moveCounter: 0,
						  boardRows: boardRows
				};
				this.getCardValues((boardRows * boardRows) / 2);
		}

		//TODO: Move into higher component, pass it via props in order to be able to provide implementation in tests
		getCardValues(howMany){
				  const url = 'https://gateway.marvel.com/v1/public/characters?limit=' 
							 + howMany + '&ts=' + Auth.ts + '&apikey=' + Auth.apikey + '&hash=' + Auth.hash;
				  fetch(url).then((response) => {
							 return response.json();
				  }).then((json) => {
							 const heroes = json.data.results;
							 return heroes.map((hero) => { return { id: hero.id, name: hero.name, 
										img: hero.thumbnail.path + '.' + hero.thumbnail.extension }});
				  }).then((heroCollection) => {
							 this.setState({
										cards : this.generateDeck(heroCollection, howMany * 2),
										previousCard: null,
										moveCounter: 0
							 });
				  });
		}

		generateDeck(items, deckSize){
				  let duplicatedItems = items.reduce(
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
				  },500);
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

				let status, board;
				if(winner){
						  status = 'Congrats! You\'ve won the game in ' 
									 + this.state.moveCounter + ' moves.';
				}else{
						  status = 'Moves: ' + this.state.moveCounter;
				} 
				if(cards.length === 0){
						  board = <div className='loading'> Loading </div>
				}else{
						  board = (<div className="game-board">
												<Board cards={cards} rows={this.state.boardRows}
														  onClick={(i) => this.handleClick(i)}/>
									 </div>);
				}
				return (<div className="game">
								<div className="game-info">
										<div>{status}</div>
										{board}
								</div>
					     </div>);
		}
}

function isGameOver(cards) {
		  if(cards.length){
					 return !cards.map((card) => card.visible).includes(false);
		  }
		  return false;
}

export default Game;
