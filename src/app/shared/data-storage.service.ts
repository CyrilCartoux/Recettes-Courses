import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/services/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
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
    this.http
      .get<Recipe[]>('https://recettes-courses.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        // tslint:disable-next-line: no-shadowed-variable
        return recipes.map((recipes: Recipe) => {
          return { ...recipes, ingredients: recipes.ingredients ? recipes.ingredients : [] };
        });
      }))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }, (error) => {
          console.error(error);
        }
      );

  }

}
