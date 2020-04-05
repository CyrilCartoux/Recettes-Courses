import { Ingredients } from './../../shared/ingredients.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShoppinglistService } from '../services/shoppinglist.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  ingredients: Ingredients = new Ingredients(null, null);

  constructor(
    private shoppingService: ShoppinglistService
  ) { }

  ngOnInit(): void {
  }

  sendIngredient() {
    this.shoppingService.ingredientAdded.emit(this.ingredients);
  }
}
