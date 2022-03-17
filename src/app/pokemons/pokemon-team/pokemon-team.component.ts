import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { PokemonService } from '../services/pokemon.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements OnInit, OnChanges {

  team = [];
  teamNumber : number[];
  showForm=false;

  @Input() displayBlock?: boolean;

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
    console.log(changes);
    if (changes['displayBlock'].currentValue == true) {
      //afficher
      this.showForm=true;
      this.getTeam();
    }else if(changes['displayBlock'].currentValue == false){
      //faire disparaitre
      this.showForm=false;
    }
  }

  remove(pokemonToDelete: any): void {
    console.log("OUI");
    this.removeElementFromArray(this.team, pokemonToDelete);
    this.removeElementFromArray(this.teamNumber, pokemonToDelete.data[0].id);
    this.teamService.setTeam(this.teamNumber, localStorage.getItem("access_token"));
  }

  removeElementFromArray(array: any[], element: any) {
    //falg permet d'avoir plusieurs pokemons au même id
    let flag= false;
    array.forEach((value, index) => {
      if (!flag && value == element) {
        array.splice(index, 1);
        flag= true;
      }
    });
  }

}
