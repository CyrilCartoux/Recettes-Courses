import { Ingredients } from '../../shared/ingredients.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  private ingredients: Ingredients[] = [
    new Ingredients('Pommes', 2),
    new Ingredients('Tomates', 4),
    new Ingredients('Poivrons', 1)
  ];

  ingredientsChanged = new Subject<Ingredients[]>();
  startedEditing = new Subject<number>();

  constructor() { }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
    console.log(this.ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredients) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteOneIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteAllIngredients() {
    this.ingredients.splice(0, this.ingredients.length);
    this.ingredientsChanged.next(this.ingredients.slice());
  }


}
