import React, {Component} from 'react';
import Card from './Card';

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
				for(let i = (row - 1) * this.props.rows; i < row * this.props.rows; i++){
						renderedCards.push(this.renderCard(i));
				}
				return renderedCards;
		}
		renderBoard() {
				let board = [];
				for(let i=1; i <= this.props.rows; i++){
						board.push(<div key={i} className="board-row">
										{this.renderRow(i)}
								     </div>);
				}
				return board;
		}

		render() {
				return (<div> {this.renderBoard()} </div>);
		}
}
