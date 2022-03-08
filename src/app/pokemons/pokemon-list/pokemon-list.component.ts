import { Component, OnInit } from '@angular/core';
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

  constructor(private pokemonservice : PokemonService) {
   }

  ngOnInit(): void {
    this.pokemonservice.getPokemons(this.limit += 151).subscribe((listeDePokemon) => {

      this.maListeDePokemon = listeDePokemon;
    })
  }

  onScroll(): void {
    if (this.limit < 151) {
      this.pokemonservice.getPokemons(this.limit += 20).subscribe(myResult => {
        this.maListeDePokemon = [...myResult.data];
      });
    }
  }
}
