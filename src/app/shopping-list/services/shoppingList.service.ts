import { Injectable, Output, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  private ingredients: Ingredients[] = [
    new Ingredients('Pommes', 2),
    new Ingredients('Tomates', 4),
    new Ingredients('Poivrons', 1)
  ];

  @Output() ingredientAdded = new EventEmitter<Ingredients>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
  }

}
