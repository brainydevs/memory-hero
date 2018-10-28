import React, {Component} from 'react';
import icon from './favicon.ico';

export const boardRows = 4;
export default class Board extends Component {
		renderCard(i) {
		      let cardValue = this.props.cards[i] && this.props.cards[i].value;
		      let isVisible = this.props.cards[i] && this.props.cards[i].visible;
				return (
						  <Card key={i} value={cardValue} visible={isVisible}
								onClick={() => this.props.onClick(i)} />
						);
		}
		renderRow(row) {
				let renderedCards = [];
				for(let i = (row - 1) * boardRows; i < row * boardRows; i++){
						renderedCards.push(this.renderCard(i));
				}
				return renderedCards;
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

function Card(props){
		  if(props.visible){
					 return (
								<button className='card card-front' onClick={props.onClick}>
										  <img alt="Superhero icon" src={icon}/>
										  {props.value}
								</button>
								);
		  }
		  return <button className='card card-back' onClick={props.onClick}/>;
}

