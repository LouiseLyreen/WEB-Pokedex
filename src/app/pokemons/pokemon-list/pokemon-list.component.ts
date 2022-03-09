import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() getPokemonDetailsEmitter = new EventEmitter<Pokemon>();

  constructor(private pokemonservice : PokemonService) {
   }

  ngOnInit(): void {
    this.pokemonservice.getPokemons(this.limit += 151).subscribe((listeDePokemon) => {

      this.maListeDePokemon = listeDePokemon;
    })
  }

  /**ngAfterViewInit(): void {
    fromEvent(this.searchBox.nativeElement, 'keyup').pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(250)
    ).subscribe((v) => {
        if (v !== '') {
            this.pokemonService.getPokemons(null, null, v).subscribe((myResult) => {
                this.data = myResult.data;
            });
        } else {
            this.pokemonService.getPokemons(this.limit).subscribe(myResult => {
                    this.data = myResult.data;
                }
            );
        }
    });
}*/

  onScroll(): void {
    if (this.limit < 151) {
      this.pokemonservice.getPokemons(this.limit += 20).subscribe(myResult => {
        this.maListeDePokemon = [...myResult.data];
      });
    }
  }

  getPokemonDetails(pokemon: Pokemon): void {
    this.getPokemonDetailsEmitter.emit(pokemon);
}
}
