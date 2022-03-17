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
  showForm=false;

  @Input() displayBlock?: boolean;

  constructor( private pokemonService: PokemonService, private loginService: LoginService, private teamService: TeamService) { }

  ngOnInit(): void {
    //if (this.loginService.isLoggedIn()) {this.displayBlock = true;}
  }

  getTeam(): void {
    this.team = [];

    this.teamService.getTeam().subscribe((result) => {
        this.team = result;
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

}
