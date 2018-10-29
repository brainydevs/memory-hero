import React, {Component} from 'react';

export default class Card extends Component {
				render() {
								if(this.props.visible){
												return (
																<button className='card card-front' onClick={this.props.onClick}>
																				<img alt="Superhero icon" src={this.props.value.img}/>
																				{this.props.value.name}
																</button>
																);
								}
								return <button className='card card-back' onClick={this.props.onClick}/>;
				}

				componentWillMount(){
								if(this.props.value){
												const img = document.createElement('img');
												img.src = this.props.value.img; //Requests the image
								}
				}
} 
