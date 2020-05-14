import { AuthComponent } from './auth/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'recettes', pathMatch: 'full' },
  {
    path: 'recettes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  { path: 'shopping', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
