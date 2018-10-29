import React, {Component} from 'react';
import 'whatwg-fetch';
import {Auth} from './ApiKeys'
import Game from './Game';

const gameRows = 4; //Change to 6 for increased difficulty
export default class MarvelGame extends Component {
				render() {
						  return (<div>
												<Game rows={gameRows} getData={this.getHeroesFromMarvel}/> 
												<span className='copyright'>Data provided by Marvel. © 2014 Marvel</span>
									 </div>);
				}

				getHeroesFromMarvel() {
								const howMany = (gameRows * gameRows) / 2;
								const offset = Math.floor(Math.random() * 300); //random recently modified heroes
								const url = 'https://gateway.marvel.com/v1/public/characters?orderBy=-modified&limit=' 
										  + howMany +'&offset='+ offset + '&ts=' + Auth.ts + '&apikey=' + Auth.apikey + '&hash=' + Auth.hash;
								return fetch(url).then((response) => {
												return response.json();
								}).then((json) => {
												const heroes = json.data.results;
												return heroes.map((hero) => { 
														  const simpleName = hero.name.includes('(') ? 
																	 hero.name.substring(0,hero.name.indexOf('(')) : hero.name;
														  return { id: hero.id, name: simpleName, 
																img: hero.thumbnail.path + '.' + hero.thumbnail.extension }});
								});
				}

}
