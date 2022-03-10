import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component'
import { RouterModule } from '@angular/router';
import { MatListModule } from "@angular/material/list";
import { MatLineModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { PokedexComponent } from './pokedex/pokedex.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule} from "@angular/material/input";
import { FormsModule} from "@angular/forms";
//import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatFormFieldModule, MatHint} from "@angular/material/form-field";


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatListModule,
    MatLineModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
    //InfiniteScrollModule
  ]
})
export class PokemonsModule { }
