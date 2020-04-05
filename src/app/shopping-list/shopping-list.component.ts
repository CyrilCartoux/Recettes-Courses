import { Ingredients } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';
import { ShoppinglistService } from './services/shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredients[];

  constructor(
    private shoppingService: ShoppinglistService
  ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientAdded.subscribe(
      (ingredient: Ingredients) => {
        this.ingredients.push(ingredient);
      }
    );
  }

  addIngredient(ingredient: Ingredients) {
    this.shoppingService.addIngredient(ingredient);
  }
}
