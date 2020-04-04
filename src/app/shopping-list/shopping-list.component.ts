import { Ingredients } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredients[] = [
    new Ingredients('Pommes', 2),
    new Ingredients('Tomates', 4),
    new Ingredients('Poivrons', 1)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    console.log(this.ingredients);
  }
}
