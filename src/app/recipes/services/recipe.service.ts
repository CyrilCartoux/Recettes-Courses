import { Injectable, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Une autre recette', 'This is a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  getRecipes() {
    // return a new COPY array of this.recipes
    return this.recipes.slice();
  }

}
