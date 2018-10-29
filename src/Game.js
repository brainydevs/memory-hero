import React, {Component} from 'react';
import Board from './Board';
import Loading from './Loading';
import './Game.css';

export default class Game extends Component {
		constructor(props) {
				super(props);
				const boardRows = props.rows || 4;
				this.state = {
						  cards : [],
						  previousCard: null,
						  moveCounter: 0,
						  boardRows: boardRows
				};
				this.startGame(this.props.getData);
		}

		startGame(fetchDataFunc) {
					 if(fetchDataFunc) {
								fetchDataFunc().then((itemCollection) => {
									 this.setState({
												cards : this.generateDeck(itemCollection) 
									 });
						  });
					 }
		}

		restartGame() {
				  this.setState({cards : [], moveCounter: 0, previousCard: null});
				  this.startGame(this.props.getData);
		}

		generateDeck(items) {
				  const duplicatedItems = items.reduce(
							 (res,current) => res.concat([current,current]),[]);
				  const deckSize = duplicatedItems.length;
				  const orderedDeck = duplicatedItems
							 .map((hero) => { return {value : hero, visible: false}});
				  let shuffledDeck = [];
				  for(let i=0; i < deckSize; i++) {
							 const randomIndex = Math.floor(Math.random() * 
										(orderedDeck.length - i)); 
							 shuffledDeck.push(orderedDeck.splice(randomIndex, 1)[0]);
				  }
				  return shuffledDeck;
		}

		hideCardsWithDelay(cardsToHide) {
				  setTimeout(() => {
							 const cards = this.state.cards.slice();
							 if(cardsToHide && cards.length > 0) {
										cardsToHide.forEach((card) => {
												  cards[card].visible = false;
										});
										this.setState({ cards : cards });
							 }
				  },1000);
		}

		isGameOver(cards) {
				  if(cards.length) {
							 return !cards.map((card) => card.visible).includes(false);
				  }
				  return false;
		} 

		handleClick(i) {
				  const cards = this.state.cards.slice();
				  let previousCard = this.state.previousCard;
				  if(this.isGameOver(cards) || cards[i].visible) {
							 return;
				  }
				  cards[i].visible = true; //always show
							 if(previousCard !== null) { //has previously selected card
										if(cards[previousCard].value.id !== cards[i].value.id) { 
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
				  const winner = this.isGameOver(cards);

				  let status, board;
				  if(winner) {
							 status = 'Congrats! You\'ve won the game in ' 
										+ this.state.moveCounter + ' moves.';
				  }else{
							 status = 'Moves: ' + this.state.moveCounter;
				  } 
				  board = (cards.length === 0 ?
										<Loading/> : 
										<Board cards={cards} rows={this.state.boardRows} onClick={(i) => this.handleClick(i)}/>);
				  return (<div className="game">
							 <div className="game-info">
										<button className="reset-btn"
												  onClick={()=> this.restartGame()}>Restart game</button>
										<div>{status}</div>
							 </div>
							 <div className="game-board">
										{board}
							 </div>
				  </div>);
		}
}
