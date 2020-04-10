import { Ingredients } from '../../shared/ingredients.model';
import { Injectable, EventEmitter, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  private ingredients: Ingredients[] = [
    new Ingredients('Pommes', 2),
    new Ingredients('Tomates', 4),
    new Ingredients('Poivrons', 1)
  ];

  @Output() ingredientsChanged = new EventEmitter<Ingredients[]>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
    console.log(this.ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  deleteAllIngredients() {
    this.ingredients.splice(0, this.ingredients.length);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }


}
