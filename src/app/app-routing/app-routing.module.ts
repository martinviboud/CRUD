
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from '../pages/heroes/heroes.component';
import { HeroeComponent } from '../pages/heroe/heroe.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'heroes' }
];

export const appRouting = RouterModule.forRoot(routes);

