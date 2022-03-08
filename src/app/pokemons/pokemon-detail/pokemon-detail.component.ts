import { Input } from '@angular/core';
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
export class PokemonDetailComponent implements OnInit {

  @Input() pokemon?: PokemonDetails;

  constructor(private pokemonservice :PokemonService,private route: ActivatedRoute, private pageAct: Location) { }

  getPokemon(): void {
    const id = +this.route.snapshot.paramMap!.get('id');
    if (id != null)
        this.pokemonservice.getPokemonInfoById(id).subscribe(myResult => this.pokemon = myResult);
}
  ngOnInit(): void {
    //this.pokemonservice.getPokemonInfoById(id).subscribe;
    this.getPokemon();
  }

  pageAvt(): void {
    this.pageAct.back();
}

}
