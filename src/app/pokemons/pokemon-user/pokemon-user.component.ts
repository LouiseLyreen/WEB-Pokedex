import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import { LoginService } from '../services/login.service';
import { LoginResponse } from '../models/apiLogin';

@Component({
  selector: 'app-pokemon-user',
  templateUrl: './pokemon-user.component.html',
  styleUrls: ['./pokemon-user.component.scss']
})
export class PokemonUserComponent implements OnInit {

  email = environment.email;
  password = environment.password;
  showForm = true;

  @Output() getTeamEmitter = new EventEmitter<boolean>();

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.email, this.password).subscribe((response: LoginResponse) => {
      if (this.loginService.isLoggedIn()) {
        this.showForm = false;
        this.getTeamEmitter.emit(true);
      }
    });
  }

  logout():void{
    this.loginService.logout();
    this.showForm = true;
    this.getTeamEmitter.emit(false);
  }
  //pitié mes pokémons sont déformés


}
