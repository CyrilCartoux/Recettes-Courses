import { Ingredients } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';
import { ShoppinglistService } from './services/shopping-list.service';

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

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientsChanged.subscribe(
        (ingredients: Ingredients[]) => {
          this.ingredients = ingredients;
        }
      );
  }

}
