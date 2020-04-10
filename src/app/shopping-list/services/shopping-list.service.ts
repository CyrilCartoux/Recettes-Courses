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

  deleteAllIngredients() {
    this.ingredients.splice(0, this.ingredients.length);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }


}
