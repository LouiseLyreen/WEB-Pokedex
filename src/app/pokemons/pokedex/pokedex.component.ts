import { Component, OnInit } from '@angular/core';
import {Pokemon} from "../models/pokemon.model";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  selectedPokemon?: Pokemon;
  connected?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onGetPokemonDetails($event: Pokemon): void {
    this.selectedPokemon = $event;
  }

  onGetTeam($event:boolean):void{
    this.connected = $event;
  }
}
