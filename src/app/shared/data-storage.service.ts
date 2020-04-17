import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/services/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recettes-courses.firebaseio.com/recipes.json', recipes).subscribe(
      (responseData) => {
        console.log(responseData);
      }
    );
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .get<Recipe[]>('https://recettes-courses.firebaseio.com/recipes.json', {
            params: new HttpParams().set('auth', user.token)
          });
      }),
      map(recipes => {
        return recipes.map((recipes: Recipe) => {
          return { ...recipes, ingredients: recipes.ingredients ? recipes.ingredients : [] };
        });
      }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }));
  }

}
