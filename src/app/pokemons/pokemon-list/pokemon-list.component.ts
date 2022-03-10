import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit {
  maListeDePokemon: any = [];
  limit = 0;
  limitMax = 151;

  @ViewChild('searchField')
  private searchField!: ElementRef;

  @Output() getPokemonDetailsEmitter = new EventEmitter<Pokemon>();

  constructor(private pokemonservice : PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonservice.getPokemons(this.limit += 151).subscribe((listeDePokemon) => { this.maListeDePokemon = listeDePokemon;})
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchField.nativeElement, 'keyup').pipe(map((i: any) => i.currentTarget.value), debounceTime(250)).subscribe((parameter) => {
      if (parameter !== '') {
        this.pokemonservice.getPokemons(null, null, parameter).subscribe((myResult) => {this.maListeDePokemon = myResult;});
      } else {
        this.pokemonservice.getPokemons(this.limit).subscribe(myResult => {this.maListeDePokemon = myResult;});
        }
    });
  }

  onScroll(): void {
    if (this.limit < 151) {
      this.pokemonservice.getPokemons(this.limit += 20).subscribe(myResult => { this.maListeDePokemon = [...myResult.data];});
    }
  }

  getPokemonDetails(pokemon: Pokemon): void {
    this.getPokemonDetailsEmitter.emit(pokemon);
  }


}
