import { EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import {PokemonDetails} from "../models/pokemon-details.model";
import {Location} from "@angular/common";
import { Pokemon } from '../models/pokemon.model';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {

  showAdd=false;

  @Input() pokemon?: PokemonDetails;
  @Input() displayBlock?: boolean;
  @Output() addNewPokemonEmitter = new EventEmitter<number>();

  constructor(private pokemonservice :PokemonService,private route: ActivatedRoute, private pageAct: Location) { }

  getPokemon(): void {
    const paramId = this.route.snapshot.paramMap!.get('id');
    if (paramId != null) {
      const id = parseInt(paramId);
      this.pokemonservice.getPokemonInfoById(id).subscribe(myResult => this.pokemon = myResult);
    }
  }

  ngOnInit(): void {
    this.getPokemon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Display pokemon details
    if (undefined !== changes['pokemon'] && changes['pokemon'].currentValue) {
      if (changes['pokemon'].currentValue != changes['pokemon'].previousValue) {
          this.pokemonservice.getPokemonInfoById(changes['pokemon'].currentValue.id).subscribe(myResult => {this.pokemon = myResult;});
      }
    }
    //Display add button
    if (undefined !== changes['displayBlock'] && changes['displayBlock'].currentValue == true) {
      //afficher
      this.showAdd=true;
    } else if (undefined !== changes['displayBlock'] && changes['displayBlock'].currentValue == false){
      //faire disparaitre
      this.showAdd=false;
    }

  }


  addToTeam(pokemon: Pokemon): void {
    this.addNewPokemonEmitter.emit(pokemon.id);
  }

  //pageAvt(): void {
  //  this.pageAct.back();
  //}

}
