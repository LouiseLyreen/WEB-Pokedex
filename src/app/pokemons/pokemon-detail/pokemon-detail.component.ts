import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import {PokemonDetails} from "../models/pokemon-details.model";
import {Location} from "@angular/common";


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {

  @Input() pokemon?: PokemonDetails;

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
    if (changes['pokemon'].currentValue) {
      if (changes['pokemon'].currentValue != changes['pokemon'].previousValue) {
          this.pokemonservice.getPokemonInfoById(changes['pokemon'].currentValue.id).subscribe(myResult => {this.pokemon = myResult;});
      }
    }
  }

  //pageAvt(): void {
  //  this.pageAct.back();
  //}

}
