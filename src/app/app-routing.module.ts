import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';

const routes: Routes = [
  {path:'list',component:PokemonListComponent},
  {path:'',redirectTo:'list',pathMatch:'full'},
  {path:'details/:id',component:PokemonDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
