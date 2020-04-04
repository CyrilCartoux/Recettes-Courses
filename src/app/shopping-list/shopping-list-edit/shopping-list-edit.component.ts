import { Ingredients } from './../../shared/ingredients.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @Output() ingredientCreated = new EventEmitter<Ingredients>();
  ingredients: Ingredients = new Ingredients(null, null);

  constructor() { }

  ngOnInit(): void {
  }

  sendIngredient() {
    console.log(this.ingredients);
    this.ingredientCreated.emit(this.ingredients);
  }
}
