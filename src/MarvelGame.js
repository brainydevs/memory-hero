import React, {Component} from 'react';
import 'whatwg-fetch';
import {Auth} from './ApiKeys'
import Game from './Game';

const gameRows = 4; //Change to 6 for increased difficulty
export default class MarvelGame extends Component {
				render(){
								return <Game rows={gameRows} getData={this.getHeroesFromMarvel}/>
				}

				getHeroesFromMarvel(){
								const howMany = (gameRows * gameRows) / 2;
								const url = 'https://gateway.marvel.com/v1/public/characters?limit=' 
												+ howMany + '&ts=' + Auth.ts + '&apikey=' + Auth.apikey + '&hash=' + Auth.hash;
								return fetch(url).then((response) => {
												return response.json();
								}).then((json) => {
												const heroes = json.data.results;
												return heroes.map((hero) => { return { id: hero.id, name: hero.name, 
																img: hero.thumbnail.path + '.' + hero.thumbnail.extension }});
								});
				}

}
