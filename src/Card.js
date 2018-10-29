import React, {Component} from 'react';

export default class Card extends Component {
		  render() {
					 let visible = this.props.visible ? 'visible' : '';
					 return (<div className={'flip-container '+ visible} >
								<div className="flipper" onClick={this.props.onClick}>
										  <button className='back card card-back'/>
										  <button className='front card card-front'>
													 <img alt="Superhero icon" src={this.props.value.img}/>
													 {this.props.value.name}
										  </button>
								</div>
					 </div>);
		  }

		  componentWillMount() {
					 if(this.props.value) {
								const img = document.createElement('img');
								img.src = this.props.value.img; //Requests the image
					 }
		  }
} 
