import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/apiLogin';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email?: string, password?: string): Observable<LoginResponse> {
    if (email && password) {
      return this.http.post<LoginResponse>(environment.pokemonLogin, {email: email, password: password})
      .pipe(tap(response => { if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        localStorage.setItem("expire_time", response.expires_in);
      }}));
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("access_token") != null;
  }

  logout(): void {
    localStorage.clear();
  }

}
