import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }
  getPokemons(limit?: number, offset?: number, search?: string): Observable<ApiResponse> {
    let params = new HttpParams();
    if (limit) {
        params = params.set('limit', `${limit}`);
    }
    if (offset) {
        params = params.set('offset', `${offset}`);
    }
    if (search) {
        params = params.set('search', `${search}`);
    }

    return this.http.get<ApiResponse>(environment.pokemonsUrl, {params});
  }
  getPokemonInfoById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.pokemonDetails + id);
}
}
