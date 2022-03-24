import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { PokemonDetails } from '../models/pokemon-details.model';
import { Pokemon } from '../models/pokemon.model';
import { LoginService } from '../services/login.service';
import { PokemonService } from '../services/pokemon.service';
import { TeamService } from '../services/team.service';

import { ApiResponse } from '../models/apiResponse.model';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements OnInit, OnChanges {

  team = [];
  teamNumber : number[];
  showForm=false;
  pokemonDetails? : ApiResponse;

  @Input() displayBlock?: boolean;
  @Input() pokemonToAdd?: number;

  constructor( private pokemonService: PokemonService, private loginService: LoginService, private teamService: TeamService) { }

  ngOnInit(): void {
    //if (this.loginService.isLoggedIn()) {this.displayBlock = true;}
  }

  getTeam(): void {
    this.team = [];

    this.teamService.getTeam().subscribe((result) => {
        this.teamNumber = result;
        const forkArray: Observable<any>[] = result.map((id) => this.pokemonService.getPokemons(null, null, id.toString()));
        forkJoin(forkArray).subscribe(team => {this.team = team;});
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (undefined !== changes['displayBlock'] && changes['displayBlock'].currentValue == true) {
      //afficher
      this.showForm=true;
      this.getTeam();
    } else if(undefined !== changes['displayBlock'] && changes['displayBlock'].currentValue == false){
      //faire disparaitre
      this.showForm=false;
    }
    if (undefined !== changes['pokemonToAdd'] && changes['pokemonToAdd'].currentValue){
      //ajouter à l'équipe si <6
      if (this.teamNumber.length<6){
        this.teamNumber.push(changes['pokemonToAdd'].currentValue);
        this.teamService.setTeam(this.teamNumber, localStorage.getItem("access_token"));

        this.pokemonService.getPokemons(null, null, changes['pokemonToAdd'].currentValue).subscribe(myResult => {
          this.pokemonDetails = myResult;
          this.team.push(this.pokemonDetails);
        });

      }
    }

  }

  remove(pokemonToDelete: any): void {
    this.removeElementFromArray(this.team, pokemonToDelete);
    this.removeElementFromArray(this.teamNumber, pokemonToDelete.data[0].id);
    this.teamService.setTeam(this.teamNumber, localStorage.getItem("access_token"));
  }

  removeElementFromArray(array: any[], element: any) {
    //flag permet d'avoir plusieurs pokemons au même id
    let flag= false;
    array.forEach((value, index) => {
      if (!flag && value == element) {
        array.splice(index, 1);
        flag= true;
      }
    });
  }



}
