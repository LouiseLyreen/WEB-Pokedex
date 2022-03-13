import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { PokemonService } from '../services/pokemon.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements OnInit {

  showTeam = false;
  team = [];

  constructor( private pokemonService: PokemonService, private loginService: LoginService, private teamService: TeamService) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      //this.getTeam();
      this.showTeam = true;
    }
  }

  getTeam(): void {
    this.team = [];

    this.teamService.getTeam().subscribe((result) => {
        this.team = result;
        const forkArray: Observable<any>[] = result.map((id) => this.pokemonService.getPokemons(null, null, id.toString()));
        forkJoin(forkArray).subscribe(team => {this.team = team;});
    });
  }




}
