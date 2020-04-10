import { ShoppinglistService } from '../../shopping-list/services/shopping-list.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Big ass Burger',
      'Simply the best',
      'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',
      [
        new Ingredients('Pain', 2),
        new Ingredients('Steack', 1),
        new Ingredients('Fromage Burger', 2),
        new Ingredients('Salade', 1)
      ]
    ),
    new Recipe('Salade de chèvre',
      'Délicieuse et healthy',
      'https://cdn.pixabay.com/photo/2019/06/23/08/21/salad-4293114_960_720.jpg',
      [
        new Ingredients('Fromage de chèvre', 1),
        new Ingredients('Pignons', 1),
        new Ingredients('Soja', 1),
        new Ingredients('Salade', 1)
      ]
    ),
    new Recipe('Lasagnes',
      'Les meilleures lasagnes',
      'https://cdn.pixabay.com/photo/2017/02/15/15/17/meal-2069021_960_720.jpg',
      [
        new Ingredients('Pâtes à lasagnes', 7),
        new Ingredients('Boeuf haché', 1),
        new Ingredients('Gruyère', 2),
        new Ingredients('Sauce tomate', 1),
        new Ingredients('Crème fraiche ', 1)
      ]
    ),
  ];
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(
    private shoppingListService: ShoppinglistService
  ) { }

  getRecipes() {
    // return a new COPY array of this.recipes
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
