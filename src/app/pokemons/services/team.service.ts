import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/apiLogin';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  constructor(private http: HttpClient, private loginService : LoginService) { }

  getTeam(): Observable<number[]> {
    if (localStorage.getItem("access_token") !== undefined) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
      return this.http.get<number[]>(environment.pokemonTeam, {headers});
    }
  }

  setTeam(team: number[], token: string): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.put<LoginResponse>(environment.pokemonTeam, team, {headers}).subscribe(response => {
      if (null !== response && response.statusCode == "401") {
        this.setTeam(team, token);
      }
    });
  }

}
